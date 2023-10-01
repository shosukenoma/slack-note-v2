const asyncWrapper = require("express-async-wrap");

const getAllDocuments = (model) =>
  asyncWrapper(async (req, res, next) => {
    const allDocuments = await model.find({});
    res.status(200).json({ allDocuments });
    next();
  });

const createDocument = (model) =>
  asyncWrapper(async (req, res, next) => {
    const newDocument = await model.create(req.body);
    res.status(200).json({ newDocument });
  });

const deleteDocument = (model) =>
  asyncWrapper(async (req, res, next) => {
    await model.findByIdAndDelete(req.params.id);
    res.status(200).json({ Document: null, status: "success" });
    next();
  });

const getDocument = (model) =>
  asyncWrapper(async (req, res, next) => {
    const document = await model.findById(req.params.id);
    res.status(200).json({ document });
    next();
  });

const updateDocument = (model) =>
  asyncWrapper(async (req, res, next) => {
    const updatedDocument = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ updatedDocument });
  });

module.exports = {
  createDocument,
  getAllDocuments,
  deleteDocument,
  getDocument,
  updateDocument,
};
