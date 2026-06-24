require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleError } = require('./utils/handleError');
const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./modules/auth/auth.routes');



app.use('/api/auth', authRoutes);


app.use(async (err, req, res, next) => {
    return await handleError(res, 'app', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
