const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// register route
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)

    const { name, email, password } = req.body;

    //2. check if user exist (if user exist then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(409).send("User already exist!");
    }

    //3. bcrypt the user_password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. enter the new user inside database

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. generating jwtToken

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body

    const { email, password } = req.body;

    //2. check if user doesn't exist (if not then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorect");
    }
    //3. check if incoming password is the same to the database user_password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorect");
    }

    //4. wrap it up in jwtToken

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
