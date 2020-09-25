const express = require('express')
const router = express.Router()
const EventController = require('./Controllers/EventController')


router.get('/salute', (req, res) => {
    res.json(`Hello me`)
})

router.get('/all', EventController.getAllTodos)
router.post('/add', EventController.addNewTodo)
router.delete('/delete/:id', EventController.deleteTodo)
router.put('/edit/:id',EventController.updateTodo)
router.get('/todo/:todoName',EventController.getTodoByRegex)

module.exports = router