const PostService = require("../services/postService");

exports.createPost = async (req, res) => {
  try {
    const response = await PostService.createPost(req.body);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const response = await PostService.deletePost(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    res.send({ message: "Post deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const response = await PostService.updatePost(req.params.id, req.body);
    if (!response) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    res.send({ message: "Post updated successfully", success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.send(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const response = await PostService.getPost(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPostInformation = async (req, res) => {
  try {
    const response = await PostService.getPostInformation(req.params.id);
    if (!response) {
      return res.status(200).json({ message: "Post not found" });
    }
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUserInformation = async (req, res) => {
  try {
    const response = await PostService.getAllUserInformation(req.params.id);
    if (!response) {
      return res.status(200).json({ message: "User not found" });
    }
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllPostsByUser = async (req, res) => {
  try {
    const response = await PostService.getAllPostsByUser(req.params.id);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
