const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 6000;
const uri = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(uri, () => { console.log('connected to database') })

app.get('/test', (req,res) => {
    res.json('express server test ~ OK');
})

app.post('/Register', async (req,res) => {
    const {username, password} = req.body;
    const userDoc = await User.create({username, password})
    res.json(userDoc);
})

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});