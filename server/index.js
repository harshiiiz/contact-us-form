const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const app = express(); //creating the express app to handle the API requests


const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));//telling express to serve all the files from the build folder which will be created when we run npm run build command. It will contain all our react code along with the index.html file.
//This is important as we will be serving both react and Nodejs apps on the same port so we will not get CORS (Cross-Origin Resource Sharing) error which comes when an application running on one port accesses application running on another port.
app.post('/send', (req, res) => {
    try {
        const mailOptions = {
          from: req.body.email, // sender address
          to:process.env.email, // list of receivers
          subject: req.body.subject, // Subject line
          html: `
          <p>You have a new contact request.</p>
          <h3>Contact Details</h3>
          <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.message}</li>
          </ul>
          `
        };
    
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err)
            res.status(500).send({
              success: false,
              message: 'Something went wrong. Try again later'
              
            });
          } else {
            res.send({
              success: true,
              message: 'Thanks for contacting us. We will get back to you shortly'
            });
          }
        });
      } catch (error)
       {
        console.log('error', error);
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      }
    });


  app.listen(3030, () => {
    console.log('server start on port 3030');
  });