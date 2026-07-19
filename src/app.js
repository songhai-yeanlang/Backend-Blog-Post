require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { handleError } = require('./utils/handleError');
const { initSocket } = require('./utils/socket');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const authRoutes = require('./modules/auth/auth.routes');
const userProfileRoutes = require('./modules/userProfile/userProfile.route');
const blogPostRoutes = require('./modules/blogPost/blogPost.route');
const categoryRoutes = require('./modules/categories/category.route');
const tagRoutes = require('./modules/tags/tage.route');
const commentRoutes = require('./modules/comments/comment.route');
const notificationRoutes = require('./modules/notification/notification.route');

app.use('/api/auth', authRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', blogPostRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', commentRoutes);
app.use('/api', notificationRoutes);

app.use(async (err, req, res, next) => {
    return await handleError(res, 'app', err);
});

const server = http.createServer(app);
initSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Socket.io is ready`);
});
