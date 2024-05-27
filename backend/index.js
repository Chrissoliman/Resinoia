import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import path from "path";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import forge from "node-forge";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: true, // www.chris.com
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static(path.join(__dirname, "uploads/images")));

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

db.connect((err) => {
  if (err) {
    return console.log("Error in connecting to database :(");
  }
  console.log("Connected to database!");
});

// // Generate a new key pair
// const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });

// // Convert the keys to PEM format
// const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
// const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);

// console.log(privateKeyPem);
// console.log(publicKeyPem);

app.post("/signup", upload.none(), async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
        [name, email, hashedPassword, role]
      );
      res.status(200).json({ success: true, message: "Stored successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error in storing data", success: false });
      console.log("Error in storing data in database", err);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in checking existing user", success: false });
    console.log("Error in checking existing user", err);
  }
});

app.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: "1hr" }
        );
        res.json({ token: token });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }
    }
  } catch (err) {
    res.json({ success: false, message: "Error in logging" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await db.query("SELECT name, description, price, available, user_id FROM products")
    if(response.rows.length > 0) {
      return res.json({products: response.rows})
    }
    else {
      return res.json({success: false, message: "No products found!"})
    }
  } catch(err) {
    console.log("Error in fetching data: ", err)
    res.json({success: false, message: "Error in fetching data"})
  }
})

app.post("/add-product", upload.single("product"), async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const filePath = path.join("/images", file.filename); // Relative path for database storage

  try {
    await db.query(
      "INSERT INTO products (name, description, price, image, user_id) VALUES ($1, $2, $3, $4, $5)",
      [name, description, price, filePath, 1]
    );
    res.json({ success: true, message: "Product stored successfully" });
  } catch (err) {
    console.log("Error in storing product in database:", err);
    res.json({ success: false, message: "Error in storing product" });
  }
});

app.post("/update-product", upload.single("product"), async (req, res) => {
  const { name, description, price, productId } = req.body;
  const file = req.file;

  console.log(file)

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const filePath = path.join("/images", file.filename); // Relative path for database storage

  try {
    await db.query(
      "UPDATE products SET name=$1, description=$2, price=$3, image=$4, user_id=$5 WHERE id=$6;",
      [name, description, price, filePath, 1, productId]
    );
    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.log("Error in updating product in database:", err);
    res.json({ success: false, message: "Error in storing product" });
  }
})

app.post('/delete-product', async (req, res) => {
  const productId = req.body.productId

  try{
    const response = await db.query("SELECT * FROM products WHERE id=$1", [productId])
    if(response.rows.length > 0) {
      await db.query("DELETE FROM products WHERE id=$1", [productId])
      return res.json({success: true, message: "Product deleted succesfully"})
    }
    else {
      return res.json({success: false, message: "Product not found"})
    }
  } catch(err) {
    console.log("error in deleting product: ", err)
    res.json({success: false, message: "Error in deleting product"})
  }
})

app.listen(process.env.PORT, (err) => {
  console.log("Server is running");
});
