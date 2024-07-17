
"use strict";

const Todo = require("../models/todo.model");

module.exports = {
  list: async (req, res) => {
    const data = await Todo.findAndCountAll();
    res.status(200).send({
      error: false,
      result: data,
    });
  },

  create: async (req, res) => {
    // const receivedData = req.body

    // const data =  await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone
    // })

    const data = await Todo.create(req.body);

    res.status(201).send({
      error: false,
      result: data.dataValues,
    });
  },

  read: async (req, res) => {
    // const data = await Todo.findByPk(req.params.id) ----> alttaki nin kisasi
    const data = await Todo.findOne({ where: { id: req.params.id } });
    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await Todo.update(req.body, { where: { id: req.params.id } });
    res.status(202).send({
      error: false,
      result: data,
      message: data[0] >= 1 ? "updated" : "couldnt update",
      new: await Todo.findByPk(req.params.id),
    });
  },

  delete: async (req, res) => {
    const data = await Todo.destroy({ where: { id: req.params.id } });

    if (data >= 1) {
      res.sendStatus(204);
    } else {
      // res.status(404).send({
      //     error:true,
      //     result:data,
      //     message:'couldnt delete'
      // })

      res.errorStatusCode = 404;
      throw new Error("couldnt delete");
    }
  },
};