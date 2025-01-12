const Task = require("../models/task");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = await Task.create({ title, description, dueDate, status });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get all tasks with optional filtering
const getTasks = async (req, res, next) => {
  try {
    const { status, sortBy, order = "asc", limit = 10, page = 1 } = req.query;
    const query = status ? { status } : {};
    const sort = sortBy ? { [sortBy]: order === "asc" ? 1 : -1 } : {};

    const tasks = await Task.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task by ID
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete a task by ID
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Mark task as complete
const markTaskAsComplete = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskAsComplete,
};
