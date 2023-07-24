const User = require("../models/user");

exports.getUsersByCategory = async (category) => {
    try {
        // Query the database to find all users with the given category and isServiceProvider: true
        const users = await User.find({ category, isServiceProvider: true });
        // Return the list of users in the specified category
        return users;
      } catch (error) {
        // Handle any errors that occur during the database query
        throw new Error('Failed to fetch users');
      }
  };