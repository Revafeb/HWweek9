// middlewarecl
const pool = require("../config/config.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const register = (req, res, next) => {
  //email, gender, password, role
  //destructuring
  const { email, gender, password, role } = req.body;
  //cek email terdaftar
  const sql = `
    SELECT
        *
    FROM
        users
    WHERE email = $1 
    `;

  pool.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    } else {
      const foundUser = result.rows[0];
      if (!foundUser) {
        //register
        const insertSql = `
                INSERT INTO users(email, gender, password, role)
                    VALUES
                        ($1, $2, %3)
                    RETURNING *
                    `;

        pool.query(
          insertSql,
          [email, bcrypt.hashSync(password, salt), gender, role],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "internal server error" });
            } else {
              res.status(201).json({ message: "user registered successfully" });
            }
          }
        );
      } else {
        //error
        res.status(400).json({ message: "email already exist" });
      }
    }
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  //pengecekan email
  const sql = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `;
  pool.query(sql, [email], (err, result) => {
    if(err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });   
    } else {
        const foundUser = result.rows[0]

        if(!foundUser) {
            res.status(400).json({message: "Wrong email or password"})
        } else {

            //cek password
            if(bcrypt.compareSync(password, foundUser.password)) {
            //berhasil login

            } else {
                res.status(400).json({message: "Wrong email or password"})  
            }
        }
    }
  });
};

module.exports = { register, login };
