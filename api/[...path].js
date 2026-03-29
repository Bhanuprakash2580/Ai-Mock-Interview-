import app from '../server/src/app.js';
import connectDB from '../server/src/config/db.config.js';

let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    await connectDB();
    isReady = true;
  }

  return app(req, res);
}
