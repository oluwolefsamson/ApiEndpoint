// src/middleware/validate.js

const { check, validationResult } = require("express-validator");

const validateTask = [
  check("title").notEmpty().withMessage("Title is required"),
  check("dueDate").isDate().withMessage("Due date must be a valid date"),
  check("status")
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Invalid status"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateTask };
