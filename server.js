const express = require("express");
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors')
app.use(cors())

// backend middleware fix for page routing, if needed
// var history = require('connect-history-api-fallback');
// app.use(history())

const routes = require("./router/route");

// middleware so routes can pass objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    // app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'), function (err) {
        if (err) res.status(500).send(err)
    })
})

// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});