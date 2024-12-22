const express = require("express")
const connectToMongo = require("./db.js")
const app = express()
var cors = require("cors")

connectToMongo();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/notes", require("./routes/notes.js"))
app.use("/auth", require("./routes/auth.js"))

app.listen(5000, () => {
    console.log("Running on port http://localhost:5000")
})