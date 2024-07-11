// controllers/adminController.js
const Admin = require('../../model/admin/adminModel'); // Adjust the path as necessary
const { createSecretToken } = require("../../jwt");

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const { name, image, password, username } = req.body;

        // Create a new admin instance
        const newAdmin = new Admin({
            name,
            image,
            password,
            username
        });

        // Save the admin to the database
        await newAdmin.save();

        // Respond with the created admin
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Login an admin
exports.login = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        // Find the admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log(req.body)
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' });
        }
        const token = createSecretToken(admin._id, rememberMe);

        // Respond with the admin data (excluding the password)
        const adminData = {
            id: admin._id,
            name: admin.name,
            username: admin.username,
            image: admin.image,
            token: token
        };

        res.status(200).json(adminData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};