import { db } from '../../config/db.js';

let state = {
  keys: Array(10).fill(null), // 0-9: null, 1, or 2
  control: null, // 1 or 2
  controlTime: null,
};

const releaseIfTimeout = async () => {
  const [rows] = await db.query('SELECT * FROM `control` WHERE controlId = 1');
  const control = rows[0];

  if (control.userId && new Date() - new Date(control.updatedAt) > 120000) {
    await db.query('UPDATE `control` SET userId = NULL WHERE controlId = 1');
  }
};

export const toggle = async (req, res) => {
  try {
    const { user, index } = req.body;
    await releaseIfTimeout();

    const [[controlRow]] = await db.query(
      'SELECT * FROM `control` WHERE controlId = 1'
    );
    if (controlRow.userId != user) {
      return res.status(403).json({ error: 'No control' });
    }

    const [[keyRow]] = await db.query('SELECT * FROM `keys` WHERE keyId = ?', [
      index,
    ]);

    const newUser = keyRow.userId === user ? null : user;
    await db.query('UPDATE `keys` SET userId = ? WHERE keyId = ?', [
      newUser,
      index,
    ]);
    await db.query('UPDATE `control` SET userId = NULL WHERE controlId = 1');

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'internal error' });
  }
};

export const control = async (req, res) => {
  try {
    const { user } = req.body;
    await releaseIfTimeout();

    const [[controlRow]] = await db.query(
      'SELECT * FROM `control` WHERE controlId = 1'
    );
    if (!controlRow.userId) {
      await db.query(
        'UPDATE `control` SET userId = ?, updatedAt =  ? WHERE controlId = 1',
        [user, new Date()]
      );

      return res.json({ success: true });
    }

    // 👇 User already has control
    if (controlRow.userId == user) {
      const now = new Date();
      const updatedAt = new Date(controlRow.updatedAt);
      const diffMs = now - updatedAt;
      const remaining = 120 - Math.floor(diffMs / 1000);

      return res.json({
        success: false,
        reason: 'you-already-have-control',
        message: `You already acquired control. Please wait ${remaining} second(s) or click one of the keys to release it.`,
      });
    }
    const now = new Date();
    const updatedAt = new Date(controlRow.updatedAt);
    const diffMs = now - updatedAt;
    const remaining = 120 - Math.floor(diffMs / 1000);
    return res.json({
      success: false,
      reason: 'another-user-has-control',
      message: `Another user currently has control. Please wait until they click a key or timeout after ${remaining} seconds.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'internal error' });
  }
};

export const getStatus = async (req, res) => {
  try {
    await releaseIfTimeout();

    const [[controlRow]] = await db.query(
      'SELECT * FROM `control` WHERE controlId = 1'
    );
    const [keys] = await db.query('SELECT * FROM `keys` ORDER BY keyId');

    return res.json({
      keys: keys.map((k) => k.userId),
      control: controlRow.userId,
      controlTime: controlRow.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
