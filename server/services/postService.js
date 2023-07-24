const Post = require("../models/posts");
const User = require("../models/user");
const Reviews = require("../models/reviews");

exports.createPost = async (postDetails) => {
  try {
    const post = new Post(postDetails);
    return await post.save();
  } catch (error) {
    return error;
  }
};

exports.deletePost = async (postId) => {
  try {
    const post = await Post.findByIdAndDelete(postId);
    return post;
  } catch (error) {
    return error;
  }
};

exports.updatePost = async (postId, updates) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, updates, { new: true });
    return post;
  } catch (error) {
    return error;
  }
};

exports.getAllPosts = async () => {
  try {
    const posts = await Post.find({});
    return posts;
  } catch (error) {
    return error;
  }
};

exports.getPost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    return error;
  }
};

exports.getPostInformation = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return null;
    }
    const user = await User.findById(post.userId);
    if (!user) {
      return null;
    }
    const reviews = await Reviews.find({ postId });
    if (!reviews) {
      return null;
    }
    return {
      post,
      user,
      reviews,
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllPostsByUser = async (userId) => {
  try {
    const posts = await Post.find({ userId });
    return posts;
  } catch (error) {
    throw error;
  }
};
