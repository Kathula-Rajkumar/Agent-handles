const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajkumaruser:rajkumaruser@admin-agent-cluster.ktxueu2.mongodb.net/?retryWrites=true&w=majority&', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

async function deleteAgents() {
  try {
    await User.deleteMany({ role: 'agent' });
    console.log('All agents deleted!');
    process.exit(0); // Exit script after completion
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

deleteAgents();
