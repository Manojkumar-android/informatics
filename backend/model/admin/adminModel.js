const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Admin'
        },
        image: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
    },
    { timestamps: true } // Corrected from 'timestamp: true' to 'timestamps: true'
);

// Pre-save hook to hash the password before saving it to the database
adminSchema.pre('save', async function (next) {
    try {
        // Check if password is modified or new
        if (!this.isModified('password')) {
            return next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare a given password with the hashed password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('admin', adminSchema);
