import * as store from '../data/store.js';

/**
 * GET /api/quiz
 * Returns list of available quizzes (shared across all users).
 */
export const getQuizzes = async (req, res) => {
  try {
    const quizzesList = await store.getQuizzes();
    const quizzes = quizzesList.map(({ questions, ...rest }) => rest);
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ message: 'Server error fetching quizzes' });
  }
};

/**
 * GET /api/quiz/:id
 * Returns quiz questions by quiz ID.
 */
export const getQuizById = async (req, res) => {
  try {
    const quiz = await store.getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({
      quiz: { ...quiz, questions: undefined },
      questions: quiz.questions || [],
    });
  } catch (error) {
    console.error('Get quiz by ID error:', error);
    res.status(500).json({ message: 'Server error fetching quiz' });
  }
};

/**
 * POST /api/quiz  (admin)
 * Creates a new quiz (shared for all users).
 */
export const createQuiz = async (req, res) => {
  try {
    const { title, description, difficulty, icon, category, questions } = req.body;
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required.' });
    }
    const cleaned = questions.map((q) => ({
      question: q.question,
      options: Array.isArray(q.options) ? q.options : [],
      correct: typeof q.correct === 'number' ? q.correct : 0,
    }));
    const newQuiz = await store.createQuiz({
      title,
      description: description || '',
      difficulty: difficulty || 'Easy',
      icon: icon || 'Zap',
      category: category || 'general',
      totalQuestions: cleaned.length,
      questions: cleaned,
    });

    // Log this admin activity
    const adminUser = req.admin || req.user || {};
    await store.logActivity(adminUser.id, adminUser.username || 'admin', 'CREATE_QUIZ', `Created quiz "${title}" (ID: ${newQuiz.id})`);

    res.status(201).json({ quiz: { ...newQuiz, questions: undefined } });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ message: 'Server error creating quiz' });
  }
};

/**
 * PUT /api/quiz/:id  (admin)
 * Updates an existing quiz.
 */
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, difficulty, icon, category, questions } = req.body;
    const existing = await store.getQuizById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const payload = {};
    if (title !== undefined) payload.title = title;
    if (description !== undefined) payload.description = description;
    if (difficulty !== undefined) payload.difficulty = difficulty;
    if (icon !== undefined) payload.icon = icon;
    if (category !== undefined) payload.category = category;
    if (Array.isArray(questions)) {
      payload.questions = questions.map((q) => ({
        question: q.question,
        options: Array.isArray(q.options) ? q.options : [],
        correct: typeof q.correct === 'number' ? q.correct : 0,
      }));
      payload.totalQuestions = payload.questions.length;
    }
    const updated = await store.updateQuiz(req.params.id, payload);

    // Log this admin activity
    const adminUser = req.admin || req.user || {};
    await store.logActivity(adminUser.id, adminUser.username || 'admin', 'UPDATE_QUIZ', `Updated quiz "${existing.title}" (ID: ${req.params.id})`);

    res.status(200).json({ quiz: { ...updated, questions: undefined } });
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({ message: 'Server error updating quiz' });
  }
};

/**
 * DELETE /api/quiz/:id  (admin)
 */
export const deleteQuiz = async (req, res) => {
  try {
    const existing = await store.getQuizById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const ok = await store.deleteQuiz(req.params.id);
    if (!ok) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Log this admin activity
    const adminUser = req.admin || req.user || {};
    await store.logActivity(adminUser.id, adminUser.username || 'admin', 'DELETE_QUIZ', `Deleted quiz "${existing.title}" (ID: ${req.params.id})`);

    res.status(200).json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ message: 'Server error deleting quiz' });
  }
};

/**
 * POST /api/quiz/:id/submit  (auth)
 * Submits quiz results, updates leaderboard and records certificate if passed.
 */
export const submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;
    const fullName = req.user.fullName || username;
    const quizId = parseInt(req.params.id, 10);
    const { score, totalQuestions, percentage, passed } = req.body;

    const quiz = await store.getQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate streak (dynamic checking based on user's last quiz time)
    const prev = await store.getUserPointsAndStreak(userId);
    let newStreak = 1;
    if (prev && prev.lastQuizAt) {
      const last = new Date(prev.lastQuizAt);
      const today = new Date();
      const lastMid = new Date(last.getFullYear(), last.getMonth(), last.getDate());
      const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const diffDays = Math.floor((todayMid - lastMid) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) newStreak = (prev.streak || 0) + 1;
      else if (diffDays > 1) newStreak = 1;
      else if (diffDays === 0) newStreak = prev.streak || 1;
    }

    const pointsEarned = (score || 0) * 10;

    const entry = await store.upsertLeaderboardEntry({
      id: userId,
      username,
      fullName,
      pointsEarned,
      newStreak,
      lastQuizAt: new Date().toISOString(),
    });

    if (passed) {
      await store.addCertificate({
        userId,
        quizId,
        quizTitle: quiz.title,
        score: score || 0,
        totalQuestions: totalQuestions || quiz.totalQuestions || 0,
        percentage: percentage || 0,
      });
    }

    // Log user activity
    await store.logActivity(
      userId,
      username,
      'SUBMIT_QUIZ',
      `Submitted quiz "${quiz.title}" (Score: ${score}/${totalQuestions}, ${percentage}%, Passed: ${passed})`
    );

    res.status(200).json({
      message: 'Quiz results submitted successfully',
      pointsEarned,
      newStreak: entry ? entry.streak : newStreak,
      passed,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error submitting quiz' });
  }
};