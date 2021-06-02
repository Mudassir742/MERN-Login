const express = require("express");
const user = require("./models/userSchema");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();


//in .env i store database url...
dotenv.config()

app.use(cors())
app.use(express.json());


//connecting to my database....
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log(`DataBase Access Granted`))
                

app.get("/",(req,res)=>{
  res.status(200).send(`This is Home page`);
})

//endpoint for registration....
app.post("/api/signup", async (req, res) => {
  try {
    //storing data sent from client...
    const { firstName, lastName, email, password } = req.body;

    console.log(req.body)

    //checking if any of the filed is empty...
    if (!firstName || !lastName || !email || !password) {
      return res.status(422).send({meesage:"Fill the fields properly"});
    }

    //checking if email is already exist or not...
    const isEmailAlreadyExists = await user.findOne({ email: email });

    if (isEmailAlreadyExists) {
      return res.status(422).send({message:"Email already exists!"});
    }

    //if email is not existed before creating new account for that user...
    const newUser = new user({ firstName, lastName, email, password });

    const registerUser = await newUser.save()

    if (registerUser) {
      console.log({ firstName, lastName, email, password });

      //on successful registration sending positive response to client....
      return res.status(201).send({message:"Registration Successfull"});
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.listen(5000, () => console.log(`Server is up and running`));
