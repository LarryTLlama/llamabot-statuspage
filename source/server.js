/** source/server.ts */
const http = require('http');
const express = require('express');
//const router = express.Router();
const morgan = require('morgan');
const { getPosts, getPost, addError, updateStatus, deletePost, addPost, bedrockStat, javaStat } = require('./controllers/posts.js');
const path = require('path')

const app = express();

/** Logging 
app.use(morgan('dev'));
/** Parse the request 
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data 
app.use(express.json());

/** RULES OF OUR API 
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
*/
/** Routes */
console.log('router get /')
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/routes/site/index.html"));
}); //Gets main page
app.get("/require.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/routes/site/require.js"));
}); //Gets requireJS for getting node modules in HTML
app.get("/info", function (req, res) {
  res.sendFile(path.join(__dirname + "/routes/site/master.json"));
})
app.get("/errors", function (req, res) {
  res.sendFile(path.join(__dirname + "/routes/site/errors.json"));
})
app.get("/pvc/bedrock", bedrockStat)
app.get("/pvc/java", javaStat)

app.post("/log", updateStatus); //Update JSON with new data

app.post("/error", addError); //Update Errors JSON with new data

/** Error handling 
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));