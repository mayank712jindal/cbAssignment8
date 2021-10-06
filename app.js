const express = require("express");
const path = require("path");
const seedDB = require("./seed");
const app = express();
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

const visitorRoutes = require('./routes/visitorRoutes');
app.use(visitorRoutes)

// seedDB();

app.get('/', (req, res) => {
    res.render("index");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server running")
});