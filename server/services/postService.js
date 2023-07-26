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
    const user = await User.findById(post.userId);
    const reviews = await Reviews.find({ postId });
    return {
      post,
      user,
      reviews,
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllUserInformation = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    const reviews = await Reviews.find({ userId: user._id });
    return {
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
