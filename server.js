const express = require("express");
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

// backend routing middleware fix
// var history = require('connect-history-api-fallback');
// app.use(history())

var routes = require("./controllers/burger_controller");

app.use(routes);

// Serve up static assets on heroku
if (process.env.NODE_ENV === "production") {
    // app.use(express.static("client/build"));
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'), function (err) {
        if (err) res.status(500).send(err)
    })
})


// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});