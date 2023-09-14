const Post = require("../models/postsModel");
const factory = require("./handlerFactory");

const getAllPosts = factory.getAllDocuments(Post);

const createPost = factory.createDocument(Post);

const deletePost = factory.deleteDocument(Post);

const updatePost = factory.updateDocument(Post);

module.exports = { createPost, getAllPosts, deletePost, updatePost };
