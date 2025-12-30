import Task from "../models/task.model.js";
import User from "../models/user.model.js";


export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.userId,
  });
  res.json(task);
};



export const getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { createdBy: req.userId },
      { assignedTo: req.userId },
    ],
  };

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
  .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("assignedTo", "name");

  res.json({
     tasks,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  });
};


export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name",
    
  ).populate("createdBy", "name");
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate(
    "assignedTo",
    "name",
  );
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};


export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password")
  res.json(users);
};