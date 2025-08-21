const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User'); // adjust path to your user model

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit();
    }

    const admin = new User({
      name: "Rajkumar",
      email: "admin@example.com",
      password: "Admin@123",
      mobile: "+919999999999",
      role: "admin"   // make sure your schema supports role
    });

    await admin.save();
    console.log("✅ Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();
