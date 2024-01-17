// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const { connectToDb, getDb } = require('./db');

// require('dotenv').config()// Adjust the path as needed

// const app = express();
// const port = process.env.PORT

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// let db;

// // Connect to MongoDB
// connectToDb((err) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1); // Exit the process if unable to connect to MongoDB
//   }
//   db = getDb();
//   startServer();
// });

// // Signup route
// app.post('/signup', async (req, res) => {
//   try {
//     const { username, phoneNumber } = req.body;

//     // Generate a temporary password
//     const temporaryPassword = generateTemporaryPassword();

//     // Hash the temporary password before storing it
//     const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

//     // Store the user in the database
//     await db.collection('users').insertOne({
//       username,
//       password: hashedPassword,
//       phoneNumber,
//     });

//     // You can also send an email or SMS with the temporary password here

//     res.json({ message: 'Signup successful. Temporary password sent.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // // Function to generate a temporary password
// function generateTemporaryPassword() {
//   return Math.random().toString(36).slice(-8);
// }

// function startServer() {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }
