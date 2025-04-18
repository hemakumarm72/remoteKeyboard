// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// let state = {
//   keys: Array(10).fill(null), // 0-9: null, 1, or 2
//   control: null, // 1 or 2
//   controlTime: null,
// };

// const releaseIfTimeout = () => {
//   if (state.control && Date.now() - state.controlTime > 120000) {
//     state.control = null;
//     state.controlTime = null;
//   }
// };

// app.get('/api/state', (req, res) => {
//   releaseIfTimeout();
//   res.json(state);
// });

// app.post('/api/control', (req, res) => {
//   const { user } = req.body;
//   releaseIfTimeout();
//   if (!state.control) {
//     state.control = user;
//     state.controlTime = Date.now();
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });

// app.post('/api/toggle', (req, res) => {
//   const { user, index } = req.body;
//   releaseIfTimeout();
//   if (state.control !== user)
//     return res.status(403).json({ error: 'No control' });

//   state.keys[index] = state.keys[index] === user ? null : user;
//   state.control = null;
//   state.controlTime = null;

//   res.json({ success: true });
// });

// app.listen(3000, () =>
//   console.log('Server running at http://localhost:3000/api')
// );
