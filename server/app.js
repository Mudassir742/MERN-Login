const express = require("express");
const user = require("./models/userSchema");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();

dotenv.config()

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log(`DataBase Access Granted`))
                

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(422).send("Fill the fields properly");
    }

    const isEmailAlreadyExists = await user.findOne({ email: email });

    if (isEmailAlreadyExists) {
      return res.status(422).send("Email already exists!");
    }

    const newUser = new user({ firstName, lastName, email, password });

    const registerUser = newUser.save()

    if (registerUser) {
      console.log({ firstName, lastName, email, password });
      return res.status(201).send("Registration Successfull");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.listen(5000, () => console.log(`Server is up and running`));
