const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const registerRoute = require('./routes/register');

const app = express();

dotenv.config();
app.use(cors());


const port = process.env.PORT || 6000;
const uri = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(uri, () => { console.log('connected to database') })

app.get('/test', (req,res) => {
    res.json('express server test ~ OK');
})

app.get('*', (req,res) => {
    res.status(404).send("API Not Found");
})

app.use('/api/user', registerRoute);

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});