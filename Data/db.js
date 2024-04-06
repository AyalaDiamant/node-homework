const mongoose = require('mongoose');

// Replace <connection-string> with your actual connection string from MongoDB Atlas
// const connectionString = 'mongodb+srv://ayala66610:<password>@cluster0.1okfblo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = mongoose.connection;
