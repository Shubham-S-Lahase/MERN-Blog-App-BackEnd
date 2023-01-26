const express = require('express');
const app = express();
const PORT = 4000;

app.get('/test', (req,res) => {
    res.json('express server test ~ OK');
})

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
});