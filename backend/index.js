import express from "express"
import "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import expressFileUpload from "express-fileupload"
import pg from "pg"

const app = express()

const corsOptions = {
    origin: true, // www.chris.com
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  db.connect((err) => {
    if(err) {
      return console.log("Error in connecting to database :(")
    }
    console.log("Connected to database!")
  })





app.listen(process.env.PORT, (err) => {
    console.log("Server is running")
})