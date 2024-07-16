
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000


// alttaki kodun anlami, accept json and convert to object
app.use(express.json())

require("express-async-errors");

// app.all('/', (req, res)=> {
//     res.send('welcome to todo app')
// })

const {Sequelize, DataTypes} = require('sequelize')
// connection
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))

const Todo = sequelize.define('todos', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     unique: true,
    //     defaultValue: 0 
    //     // autoIncrement: true,
    //     // primaryKey: true,
    //     // comment: 'yorum ekleyebiliriz',
    //     // field: 'custom field name'
    // },
    title: {
        type: DataTypes.STRING(256),
        allowNull: false
    },

    description: DataTypes.TEXT,
    priority: {
        type: DataTypes.TINYINT,
        allowNull:false,
        defaultValue: 0
    }, 
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

// sequelize.sync({alter:true})

sequelize.authenticate().then(()=>console.log('** db connected **')).catch(()=> console.log('** db not connected **'))

// routes

const router = express.Router()

// create todo

router.post('/', async (req, res)=> {

    // const receivedData = req.body

    // const data =  await Todo.create({
    //     title: receivedData.title,
    //     description: receivedData.description,
    //     priority: receivedData.priority,
    //     isDone: receivedData.isDone
    // })

    const data = await Todo.create(req.body)

    res.status(201).send({
        error:false,
        result: data.dataValues
    })

})

// list todo

router.get('/', async (req, res)=> {
    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error: false,
        result: data
    })
})

// read todo

router.get('/:id', async(req, res) => {
    // const data = await Todo.findByPk(req.params.id) ----> alttaki nin kisasi
    const data = await Todo.findOne({where:{id: req.params.id}})
    res.status(200).send({
        error: false,
        result:data
    })
})

//  update todo

router.put('/')

app.use(router)



const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked')
    res.status(errorStatusCode).send ({
        error: true,
        message: err.message,
        cause: err.cause
    })
}

app.use(errorHandler)

app.listen(PORT, ()=> console.log('running: http://127.0.0.1:' + PORT))
