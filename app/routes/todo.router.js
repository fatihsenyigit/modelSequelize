"use strict";

// const router = express.Router();
const router = require("express").Router();

const todo = require("../controllers/todoController");

// create todo

// router.post("/", todo.create);

// // list todo

// router.get("/", todo.list);

// // read todo

// router.get("/:id", todo.read);

// //  update todo

// router.put("/:id", todo.update);

// // delete todo

// router.delete("/:id", todo.delete);

router.route("/").get(todo.list).post(todo.create);

router.route("/:id").get(todo.read).put(todo.update).delete(todo.delete);

module.exports = router;
