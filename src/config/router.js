import keyboard from '../components/index.js';

const applicationRouter = (app) => {
  app.use('/api', keyboard);
};

export default applicationRouter;
