const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Make sure this path is correct based on your project structure

const users = [
    {
        username: 'deptHead1',
        password: 'password123', // This will be hashed
        role: 'user' // or 'admin'
    },
    {
        username: 'admin1',
        password: 'admin123',
        role: 'admin'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/your-database-name', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing users
        await User.deleteMany({});

        // Insert users
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
                username: user.username,
                password: hashedPassword,
                role: user.role
            });
            await newUser.save();
        }

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();
