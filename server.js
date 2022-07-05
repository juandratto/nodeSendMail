//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

//usuario y passwd smtp
const details = require("./details.json");

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*" }));
app.use(bodyParser.json());

//start application server on port 3000
app.listen(3000, () => {
  console.log("The server started on port 3000");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail (user, callback) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: details.email,
        pass: details.password
      }
    });

    let mailOptions = {
      from: `${details.email}`,
      to: `info@mazamariit.pe`,
      subject: `${user.name} - ${user.email} - ${user.phone_number}`,
      html: `Mensaje --> ${user.message}`
      };
    
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  };