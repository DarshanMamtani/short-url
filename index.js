const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/shortUrl', {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });

// Used to serve static files like HTML
const static = express.static('public');
// app.use() is Middlewear: Will be excuted before serving any request/end-points
app.use(static);
app.use(bodyParser.json());

app.post("/shortUrl", (req, res) => {
    console.log(req.body);
    // await ShortUrl.create({
    //     full: req.body.url
    // })
});

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});