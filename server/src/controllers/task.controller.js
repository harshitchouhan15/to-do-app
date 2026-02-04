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
  



  const tasks = await Task.find({ createdBy: req.userId })
  .sort({ createdAt: -1 })
   

  res.json({
     tasks,
    
  });
};




export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
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