const listingService = require("../services/listingsService");

exports.getUsersByCategory = async (req, res) => {
    const { category } = req.params;
  
    try {
      // Call the getUsersByCategory function from the userService with the specified category
      const users = await listingService.getUsersByCategory(category);
  
      // Return the list of users in the specified category as a response
      res.json(users);
    } catch (error) {
      // Handle any errors that occur during the user fetch
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };