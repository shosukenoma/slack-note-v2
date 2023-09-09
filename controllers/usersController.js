const User = require("../models/usersModel");
const factory = require("./handlerFactory");

const getAllUsers = factory.getAllDocuments(User);

const createUser = factory.createDocument(User);

const deleteUser = factory.deleteDocument(User);

const updateUser = factory.updateDocument(User);

module.exports = { createUser, getAllUsers, deleteUser, updateUser };
