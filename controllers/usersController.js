const User = require("../models/usersModel");
const factory = require("./handlerFactory");

const createUser = factory.createDocument(User);

const getUser = factory.getDocument(User)

const updateUser = factory.updateDocument(User);

module.exports = { createUser, getUser, updateUser };
