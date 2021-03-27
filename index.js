const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

const app = express();
const port = process.env.PORT || 3000;

// Connecting to Database || Arguments passed to avoid depricated warnings
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Used to serve static files like HTML
const static = express.static('public');
// app.use() is Middlewear: Will be excuted before serving any request/end-points
app.use(static);
app.use(express.json());


app.post("/shortUrl", async (req, res) => {
    await ShortUrl.create({
        full: req.body.url
    });
    const shortUrls = await ShortUrl.find().sort({ $natural: -1 }).limit(5);
    res.send(shortUrls);
});

app.get("/:shortUrl", async (req, res) => {
    const doc = await ShortUrl.findOne({ short: req.params.shortUrl })

    if(doc){
        res.redirect(doc.full);
    }
});

app.post("/showUrls", async (req, res) => {
    const shortUrls = await ShortUrl.find().sort({ $natural: -1 }).limit(5);
    res.send(shortUrls);
});

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});