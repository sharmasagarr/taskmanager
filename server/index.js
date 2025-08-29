// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import userRoutes from './routes/userRoutes.js'; 
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);

// // MongoDB connection & server start
// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.DATABASE_URL;

// mongoose.connect(MONGO_URI)
// .then(() => {
//   console.log('✅ Connected to MongoDB');
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// })
// .catch((err) => {
//   console.error('MongoDB connection failed:', err.message);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

// Export instead of listen
export const handler = serverless(app);
