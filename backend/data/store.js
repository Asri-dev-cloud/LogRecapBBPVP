import db from '../config/db.mjs';

// Seed quizzes (migrated from the previous in-memory list)
const seedQuizzes = [
  {
    id: 1,
    title: 'HTML Fundamentals',
    description: 'Test your knowledge of HTML elements, attributes, and structure.',
    difficulty: 'Easy',
    totalQuestions: 10,
    icon: 'FileCode2',
    category: 'html',
    questions: [
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Management Language'], correct: 0 },
      { question: 'Which tag is used for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correct: 2 },
      { question: 'What is the correct HTML for inserting an image?', options: ['<img src="image.jpg" alt="My Image">', '<image src="image.jpg">', '<img href="image.jpg">', '<img>image.jpg</img>'], correct: 0 },
      { question: 'Which tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<nav>'], correct: 1 },
      { question: 'What does the <br> tag do?', options: ['Bold text', 'Break line', 'Add border', 'Create button'], correct: 1 },
      { question: 'Which attribute is used to specify unique element IDs?', options: ['class', 'id', 'name', 'key'], correct: 1 },
      { question: 'What is the correct HTML element for inserting a line break?', options: ['<lb>', '<break>', '<br>', '<newline>'], correct: 2 },
      { question: 'Which doctype is correct for HTML5?', options: ['<!DOCTYPE html>', '<!DOCTYPE HTML5>', '<!DOCTYPE html5>', '<html5>'], correct: 0 },
      { question: 'Which HTML attribute is used to define inline styles?', options: ['class', 'style', 'font', 'css'], correct: 1 },
      { question: 'What is the purpose of the alt attribute in images?', options: ['Alternative text for accessibility', 'Image alignment', 'Image size', 'Image color'], correct: 0 },
    ],
  },
  {
    id: 2,
    title: 'CSS Styling Mastery',
    description: 'Challenge yourself with CSS selectors, layout, and responsive design.',
    difficulty: 'Medium',
    totalQuestions: 10,
    icon: 'Palette',
    category: 'css',
    questions: [
      { question: 'Which CSS property changes text color?', options: ['font-color', 'text-color', 'color', 'foreground'], correct: 2 },
      { question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correct: 1 },
      { question: 'Which property controls the space inside an element?', options: ['margin', 'padding', 'spacing', 'border'], correct: 1 },
      { question: 'Which value of position makes an element stay fixed on screen?', options: ['absolute', 'relative', 'fixed', 'static'], correct: 2 },
      { question: 'How do you select an element with id "demo"?', options: ['.demo', '#demo', '*demo', 'demo'], correct: 1 },
      { question: 'Which property makes a flex container?', options: ['display: block', 'display: flex', 'display: inline', 'display: grid'], correct: 1 },
      { question: 'What is the default value of position?', options: ['relative', 'absolute', 'static', 'fixed'], correct: 2 },
      { question: 'Which property is used for rounded corners?', options: ['border-radius', 'corner-round', 'border-curve', 'round-corner'], correct: 0 },
      { question: 'What does the z-index property control?', options: ['Zoom level', 'Stacking order', 'Z-axis rotation', 'Opacity'], correct: 1 },
      { question: 'Which unit is relative to the font-size of the element?', options: ['px', 'vw', 'em', 'rem'], correct: 2 },
    ],
  },
  {
    id: 3,
    title: 'JavaScript Core Concepts',
    description: 'Cover variables, functions, closures, and ES6+ features.',
    difficulty: 'Medium',
    totalQuestions: 15,
    icon: 'SquareTerminal',
    category: 'javascript',
    questions: [
      { question: 'Which keyword declares a variable in JavaScript?', options: ['var', 'let', 'const', 'All of the above'], correct: 3 },
      { question: 'What is the result of typeof null?', options: ['null', 'undefined', 'object', 'boolean'], correct: 2 },
      { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 0 },
      { question: 'What does the === operator check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correct: 2 },
      { question: 'Which function creates a new array with transformed elements?', options: ['filter()', 'map()', 'reduce()', 'forEach()'], correct: 1 },
      { question: 'What is a closure?', options: ['A function with access to outer scope', 'A closed function', 'An object method', 'A loop construct'], correct: 0 },
      { question: 'What does the spread operator (...) do?', options: ['Spread strings', 'Expand iterables', 'Create copies', 'All of the above'], correct: 3 },
      { question: 'Which method removes the last element of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 1 },
      { question: 'What is the output of 0 == false?', options: ['true', 'false', 'undefined', 'Error'], correct: 0 },
      { question: 'Which promise method handles successful resolution?', options: ['catch()', 'finally()', 'then()', 'resolve()'], correct: 2 },
      { question: 'What does JSON.stringify() do?', options: ['Parses JSON', 'Converts object to JSON string', 'Validates JSON', 'Minifies JSON'], correct: 1 },
      { question: 'How do you write a comment in JavaScript?', options: ['// comment', '<!-- comment -->', '# comment', '/* comment */'], correct: 0 },
      { question: 'Which loop is guaranteed to run at least once?', options: ['for', 'while', 'do...while', 'forEach'], correct: 2 },
      { question: 'What is the correct way to check if an object has a property?', options: ['obj.hasProperty(key)', 'obj.includes(key)', 'key in obj', 'obj.contains(key)'], correct: 2 },
      { question: 'What does NaN stand for?', options: ['Not a Number', 'Null and Number', 'Number at Null', 'None'], correct: 0 },
    ],
  },
  {
    id: 4,
    title: 'React & JSX',
    description: 'Components, props, state, hooks, and the React lifecycle.',
    difficulty: 'Hard',
    totalQuestions: 12,
    icon: 'Atom',
    category: 'react',
    questions: [
      { question: 'What is JSX?', options: ['JavaScript Extension', 'JavaScript XML', 'Java Syntax Extension', 'JSON XML'], correct: 1 },
      { question: 'Which hook manages state in functional components?', options: ['useEffect', 'useState', 'useContext', 'useRef'], correct: 1 },
      { question: 'What is the correct way to pass props?', options: ['<Component props={value} />', '<Component prop={value} />', '<Component value={prop} />', '<Component with={value} />'], correct: 1 },
      { question: 'What does useEffect handle?', options: ['State updates', 'Side effects', 'Component styling', 'Routing'], correct: 1 },
      { question: 'Which hook is used for memoizing values?', options: ['useMemo', 'useCallback', 'useRef', 'useReducer'], correct: 0 },
      { question: 'What is the virtual DOM?', options: ['The real browser DOM', 'A lightweight copy of the DOM', 'A JavaScript framework', 'A CSS preprocessor'], correct: 1 },
      { question: 'How do you conditionally render in React?', options: ['if statements', 'ternary operator', '&& operator', 'All of the above'], correct: 3 },
      { question: 'What is the purpose of keys in lists?', options: ['Unique identification', 'Styling', 'Sorting', 'Caching'], correct: 0 },
      { question: 'Which hook runs after component mounts?', options: ['useState', 'useEffect with []', 'useLayoutEffect', 'useRef'], correct: 1 },
      { question: 'What is React Context used for?', options: ['State management across components', 'Styling components', 'API calls', 'Routing'], correct: 0 },
      { question: 'How do you prevent re-renders in React?', options: ['React.memo', 'useMemo', 'useCallback', 'All of the above'], correct: 3 },
      { question: 'What does useRef return?', options: ['A number', 'A mutable ref object', 'A function', 'A string'], correct: 1 },
    ],
  },
  {
    id: 5,
    title: 'Node.js & Express',
    description: 'Server-side JavaScript, REST APIs, and middleware.',
    difficulty: 'Hard',
    totalQuestions: 10,
    icon: 'Server',
    category: 'nodejs',
    questions: [
      { question: 'What is Node.js primarily used for?', options: ['Frontend development', 'Server-side JavaScript', 'Database management', 'CSS preprocessing'], correct: 1 },
      { question: 'Which method creates an HTTP server in Node.js?', options: ['http.createServer()', 'http.newServer()', 'http.startServer()', 'http.listen()'], correct: 0 },
      { question: 'What does Express.js simplify?', options: ['Database queries', 'Route handling', 'DOM manipulation', 'CSS styling'], correct: 1 },
      { question: 'Which status code means "Not Found"?', options: ['200', '404', '500', '301'], correct: 1 },
      { question: 'What is middleware in Express?', options: ['Database layer', 'Functions that execute during request cycle', 'Template engine', 'CSS framework'], correct: 1 },
      { question: 'Which method is used to parse JSON bodies in Express?', options: ['express.json()', 'express.parse()', 'express.bodyParser()', 'express.jsonParser()'], correct: 0 },
      { question: 'What is the purpose of package.json?', options: ['Package documentation', 'Dependency management', 'Code minification', 'Testing configuration'], correct: 1 },
      { question: 'Which module handles file system operations?', options: ['path', 'fs', 'os', 'http'], correct: 1 },
      { question: 'What does the require() function do?', options: ['Imports modules', 'Exports modules', 'Reloads modules', 'Creates modules'], correct: 0 },
      { question: 'Which status code indicates a successful POST request?', options: ['200', '201', '204', '301'], correct: 1 },
    ],
  },
  {
    id: 6,
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework classes and responsive design patterns.',
    difficulty: 'Easy',
    totalQuestions: 8,
    icon: 'Wind',
    category: 'tailwind',
    questions: [
      { question: 'What is Tailwind CSS?', options: ['A CSS framework', 'A JavaScript library', 'A utility-first CSS framework', 'A CSS preprocessor'], correct: 2 },
      { question: 'Which class adds padding on all sides?', options: ['p-4', 'm-4', 'pad-4', 'padding-4'], correct: 0 },
      { question: 'How do you make text bold in Tailwind?', options: ['font-bold', 'bold', 'font-700', 'text-bold'], correct: 0 },
      { question: 'Which class sets display: flex?', options: ['flex', 'd-flex', 'display-flex', 'flex-box'], correct: 0 },
      { question: 'What does the "md:" prefix mean?', options: ['Medium devices breakpoint', 'Mobile design', 'Margin default', 'Minimum display'], correct: 0 },
      { question: 'Which class adds rounded corners?', options: ['rounded', 'circle', 'border-round', 'corner-round'], correct: 0 },
      { question: 'How do you set text color to red?', options: ['text-red-500', 'color-red', 'font-red', 'bg-red'], correct: 0 },
      { question: 'What does the "gap-4" class do?', options: ['Sets grid gap', 'Sets flex gap', 'Both grid and flex gap', 'Sets margin'], correct: 2 },
    ],
  },
  {
    id: 7,
    title: 'Database & SQL',
    description: 'Queries, indexing, joins, and database design fundamentals.',
    difficulty: 'Medium',
    totalQuestions: 10,
    icon: 'Database',
    category: 'database',
    questions: [
      { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'], correct: 0 },
      { question: 'Which command retrieves data from a table?', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], correct: 2 },
      { question: 'What is a primary key?', options: ['Unique identifier for each row', 'A foreign reference', 'An indexed column', 'A table name'], correct: 0 },
      { question: 'What does JOIN do?', options: ['Combines rows from two tables', 'Deletes duplicate rows', 'Creates a new table', 'Updates multiple tables'], correct: 0 },
      { question: 'Which clause filters rows?', options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'], correct: 2 },
      { question: 'What is an index used for?', options: ['Speeding up queries', 'Data encryption', 'User authentication', 'Backup creation'], correct: 0 },
      { question: 'Which command adds a new row?', options: ['INSERT INTO', 'ADD ROW', 'CREATE ROW', 'NEW ROW'], correct: 0 },
      { question: 'What does the COUNT() function do?', options: ['Counts rows', 'Counts columns', 'Counts databases', 'Counts characters'], correct: 0 },
      { question: 'What is a foreign key?', options: ['References primary key in another table', 'A unique column', 'An indexed column', 'A special data type'], correct: 0 },
      { question: 'Which statement removes a table?', options: ['DELETE TABLE', 'REMOVE TABLE', 'DROP TABLE', 'CLEAR TABLE'], correct: 2 },
    ],
  },
  {
    id: 8,
    title: 'DOM Manipulation',
    description: 'Traversal, events, and dynamic content updates in the browser.',
    difficulty: 'Easy',
    totalQuestions: 8,
    icon: 'Network',
    category: 'dom',
    questions: [
      { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Digital Object Management'], correct: 0 },
      { question: 'Which method selects an element by ID?', options: ['getElementById()', 'getElementByClass()', 'querySelector()', 'getElementsByTagName()'], correct: 0 },
      { question: 'How do you add an event listener?', options: ['element.addEventListener()', 'element.onClick()', 'element.listen()', 'element.attach()'], correct: 0 },
      { question: 'What does textContent do?', options: ['Gets/sets text content', 'Gets/sets HTML content', 'Gets/sets CSS', 'Gets/sets attributes'], correct: 0 },
      { question: 'Which method creates a new element?', options: ['createElement()', 'newElement()', 'addElement()', 'buildElement()'], correct: 0 },
      { question: 'What is event bubbling?', options: ['Event propagates upward', 'Event propagates downward', 'Event is cancelled', 'Event repeats'], correct: 0 },
      { question: 'Which property gets the parent node?', options: ['parentNode', 'parentElement', 'Both work', 'getParent()'], correct: 2 },
      { question: 'How do you remove a child element?', options: ['removeChild()', 'deleteChild()', 'removeElement()', 'detachChild()'], correct: 0 },
    ],
  },
];

// Helper to log user and admin activities in MySQL
export const logActivity = async (userId, username, action, details) => {
  try {
    await db.query('CALL sp_log_activity(?, ?, ?, ?)', [
      userId || null,
      username || null,
      action,
      details ? String(details) : '',
    ]);
  } catch (err) {
    console.error('Failed to log activity in database:', err);
  }
};

// Ensure notes table exists and alter quiz_questions to add image column
export const initDatabaseSchema = async () => {
  try {
    // 1. Ensure notes table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id VARCHAR(100) PRIMARY KEY,
        user_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('MySQL "notes" table verified/created.');

    // 2. Ensure "image" column exists in "quiz_questions" table
    const [columns] = await db.query("SHOW COLUMNS FROM quiz_questions LIKE 'image'");
    if (columns.length === 0) {
      console.log("Adding 'image' column to quiz_questions table...");
      await db.query("ALTER TABLE quiz_questions ADD COLUMN image LONGTEXT DEFAULT NULL");
      console.log("Added 'image' column successfully.");
    }
  } catch (err) {
    console.warn('Failed to initialize database schema:', err.message);
  }
};

// Seed function to insert default quizzes into MySQL database if empty
export const seedQuizzesIfEmpty = async () => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM quizzes');
    if (rows[0] && rows[0].count === 0) {
      console.log('Seeding default quizzes into MySQL...');
      for (const q of seedQuizzes) {
        const [res] = await db.query(
          'INSERT INTO quizzes (title, description, difficulty, totalQuestions, icon, category) VALUES (?, ?, ?, ?, ?, ?)',
          [q.title, q.description, q.difficulty, q.totalQuestions, q.icon, q.category]
        );
        const quizId = res.insertId;
        for (const qst of q.questions) {
          await db.query(
            'INSERT INTO quiz_questions (quiz_id, question, options, correct, image) VALUES (?, ?, ?, ?, ?)',
            [quizId, qst.question, JSON.stringify(qst.options), qst.correct, qst.image || null]
          );
        }
      }
      console.log('MySQL quizzes seeded successfully.');
    }
  } catch (err) {
    console.warn('Seeding quizzes check failed (server may be offline/database not initialized):', err.message);
  }
};

// Initiate check in the background
const runInit = async () => {
  await initDatabaseSchema();
  await seedQuizzesIfEmpty();
};
runInit();

// ---- Quizzes ----
export const getQuizzes = async () => {
  const [rows] = await db.query('SELECT * FROM quizzes ORDER BY id ASC');
  return rows;
};

export const getQuizById = async (id) => {
  const [quizzes] = await db.query('SELECT * FROM quizzes WHERE id = ?', [id]);
  if (quizzes.length === 0) return null;
  const quiz = quizzes[0];
  const [questions] = await db.query('SELECT question, options, correct, image FROM quiz_questions WHERE quiz_id = ?', [id]);

  const formattedQuestions = questions.map((q) => {
    let opts = q.options;
    if (typeof opts === 'string') {
      try {
        opts = JSON.parse(opts);
      } catch {
        opts = [];
      }
    }
    return {
      question: q.question,
      options: Array.isArray(opts) ? opts : [],
      correct: q.correct,
      image: q.image || '',
    };
  });

  return { ...quiz, questions: formattedQuestions };
};

export const createQuiz = async (quiz) => {
  const [res] = await db.query(
    'INSERT INTO quizzes (title, description, difficulty, totalQuestions, icon, category) VALUES (?, ?, ?, ?, ?, ?)',
    [
      quiz.title,
      quiz.description || '',
      quiz.difficulty || 'Easy',
      quiz.totalQuestions || 0,
      quiz.icon || 'Zap',
      quiz.category || 'general',
    ]
  );
  const quizId = res.insertId;
  if (Array.isArray(quiz.questions)) {
    for (const q of quiz.questions) {
      await db.query(
        'INSERT INTO quiz_questions (quiz_id, question, options, correct, image) VALUES (?, ?, ?, ?, ?)',
        [quizId, q.question, JSON.stringify(q.options), q.correct, q.image || null]
      );
    }
  }
  return { id: quizId, ...quiz };
};

export const updateQuiz = async (id, quiz) => {
  const updateFields = [];
  const updateValues = [];
  if (quiz.title !== undefined) { updateFields.push('title = ?'); updateValues.push(quiz.title); }
  if (quiz.description !== undefined) { updateFields.push('description = ?'); updateValues.push(quiz.description); }
  if (quiz.difficulty !== undefined) { updateFields.push('difficulty = ?'); updateValues.push(quiz.difficulty); }
  if (quiz.icon !== undefined) { updateFields.push('icon = ?'); updateValues.push(quiz.icon); }
  if (quiz.category !== undefined) { updateFields.push('category = ?'); updateValues.push(quiz.category); }
  if (quiz.totalQuestions !== undefined) { updateFields.push('totalQuestions = ?'); updateValues.push(quiz.totalQuestions); }

  if (updateFields.length > 0) {
    updateValues.push(id);
    await db.query(`UPDATE quizzes SET ${updateFields.join(', ')} WHERE id = ?`, updateValues);
  }

  if (Array.isArray(quiz.questions)) {
    await db.query('DELETE FROM quiz_questions WHERE quiz_id = ?', [id]);
    for (const q of quiz.questions) {
      await db.query(
        'INSERT INTO quiz_questions (quiz_id, question, options, correct, image) VALUES (?, ?, ?, ?, ?)',
        [id, q.question, JSON.stringify(q.options), q.correct, q.image || null]
      );
    }
  }

  return getQuizById(id);
};

export const deleteQuiz = async (id) => {
  const [res] = await db.query('DELETE FROM quizzes WHERE id = ?', [id]);
  return res.affectedRows > 0;
};

// ---- Materials (per topic) ----
export const getMaterials = async (slug) => {
  const [rows] = await db.query('SELECT * FROM materials WHERE topic_slug = ? ORDER BY created_at ASC', [slug]);
  return rows.map((row) => {
    let pts = row.points;
    if (typeof pts === 'string') {
      try {
        pts = JSON.parse(pts);
      } catch {
        pts = [];
      }
    }
    return {
      id: row.id,
      topic_slug: row.topic_slug,
      type: row.type,
      title: row.title,
      description: row.description,
      points: Array.isArray(pts) ? pts : [],
      code: row.code || '',
      language: row.language || '',
      codeTitle: row.code_title || '',
      source: 'custom',
    };
  });
};

export const addMaterial = async (slug, section) => {
  await db.query(
    'INSERT INTO materials (id, topic_slug, type, title, description, points, code, language, code_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      section.id,
      slug,
      section.type,
      section.title,
      section.description || '',
      JSON.stringify(section.points || []),
      section.code || '',
      section.language || '',
      section.codeTitle || '',
    ]
  );
  return getMaterials(slug);
};

export const deleteMaterial = async (slug, id) => {
  const [res] = await db.query('DELETE FROM materials WHERE id = ? AND topic_slug = ?', [id, slug]);
  return res.affectedRows > 0;
};

// ---- Leaderboard ----
export const getLeaderboard = async () => {
  const [storedProcResult] = await db.query('CALL sp_get_leaderboard()');
  const board = storedProcResult[0] || [];
  return board.map((u, i) => ({ rank: i + 1, ...u }));
};

export const upsertLeaderboardEntry = async ({ id, username, fullName, pointsEarned, newStreak }) => {
  await db.query('CALL sp_update_user_points_streak(?, ?, ?)', [id, pointsEarned, newStreak]);
  const [users] = await db.query('SELECT id, username, fullName, totalPoints, streak FROM users WHERE id = ?', [id]);
  return users[0] || null;
};

// ---- Certificates ----
export const addCertificate = async (cert) => {
  await db.query('CALL sp_add_certificate(?, ?, ?, ?, ?, ?)', [
    cert.userId,
    cert.quizId,
    cert.quizTitle,
    cert.score,
    cert.totalQuestions,
    cert.percentage,
  ]);
  return cert;
};

export const getCertificates = async (userId) => {
  const [storedProcResult] = await db.query('CALL sp_get_user_certificates(?)', [userId]);
  const certs = storedProcResult[0] || [];
  return certs.map((cert) => ({
    ...cert,
    id: cert.id,
    quizId: cert.quizId || cert.quiz_id,
    quizTitle: cert.quizTitle || cert.quiz_title,
    score: cert.score,
    totalQuestions: cert.totalQuestions || cert.total_questions,
    percentage: cert.percentage,
    date: cert.date || cert.created_at,
  }));
};

export const getUserPointsAndStreak = async (userId) => {
  const [rows] = await db.query('SELECT last_quiz_at AS lastQuizAt, streak FROM users WHERE id = ?', [userId]);
  return rows[0] || null;
};

// ---- Notes (Catatan) ----
export const getNotesByUserId = async (userId) => {
  const [rows] = await db.query('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  return rows.map((row) => {
    let content = row.content;
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
      } catch {
        content = {};
      }
    }
    return {
      id: row.id,
      type: row.type,
      title: row.title,
      createdAt: row.created_at,
      content,
    };
  });
};

export const createNote = async (note) => {
  await db.query(
    'INSERT INTO notes (id, user_id, type, title, content, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      note.id,
      note.userId,
      note.type,
      note.title,
      JSON.stringify(note.content),
      note.createdAt ? new Date(note.createdAt) : new Date()
    ]
  );
  return note;
};

export const deleteNote = async (id, userId) => {
  const [res] = await db.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
  return res.affectedRows > 0;
};