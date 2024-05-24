import express from "express"
import "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import expressFileUpload from "express-fileupload"
import pg from "pg"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import multer from "multer"

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

const upload = multer()

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

  app.post("/signup", upload.none(), async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);

        if (result.rows.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await db.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", [name, email, hashedPassword, role]);
            res.status(200).json({ success: true, message: "Stored successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error in storing data", success: false });
            console.log("Error in storing data in database", err);
        }

    } catch (err) {
        res.status(500).json({ message: "Error in checking existing user", success: false });
        console.log("Error in checking existing user", err);
    }
});




app.listen(process.env.PORT, (err) => {
    console.log("Server is running")
})