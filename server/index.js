const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/post');
const PostModel = require('./models/Post');


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));


const port = process.env.PORT || 6000;
const uri = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Error Connecting to database", err);
})

app.get('/test', (req,res) => {
    res.json('express server test ~ OK');
})

// app.get('*', (req,res) => {
//     res.status(404).send("API Not Found");
// })

app.use('/api/user', registerRoute);
app.use('/api/user', loginRoute);
app.use('/api/user', profileRoute);
app.use('/api/user', logoutRoute);
app.use('/api/user', postRoute);



app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});