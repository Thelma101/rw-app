const { connectToDatabase } = require('./models/database');

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await connectToDatabase();
    const app = require('./app');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();