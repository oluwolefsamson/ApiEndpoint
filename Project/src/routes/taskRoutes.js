const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskAsComplete,
} = require("../controllers/taskControllers");

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id/complete", markTaskAsComplete);

module.exports = router;
