import * as store from '../data/store.js';

/**
 * GET /api/leaderboard
 * Returns sorted array of top users based on total points.
 */
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await store.getLeaderboard();
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error fetching leaderboard' });
  }
};