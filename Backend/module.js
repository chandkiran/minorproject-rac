// module.js

const { getDb } = require('./db'); // Assuming the path to your db.js file
const bcrypt=require('bcrypt')

// Define user collection
const userCollection = getDb().collection('users');

// Hash password before inserting into the collection
async function insertUser(user) {
    try {
    const hashedpasword=await bcrypt.hashSync('password',10)

        const result = await userCollection.insertOne(user);
        console.log('User created:', result.ops[0]);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

module.exports = {
    insertUser
    // You can add other functions related to user operations here
};
