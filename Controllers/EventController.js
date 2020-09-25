const conn = require('../service/dbService')
const moment = require('moment')

module.exports = EventController = {
    getAllTodos: async (req, res) => {
        try {
            const query = `SELECT * FROM todos `
            await conn.query(query, (err, results) => {
                if (err) console.log(err)
                const formattedResult = results.map(result => {
                    return ({
                        id: result.id,
                        todo: result.todo.replace(/'/g,""),
                        time: moment(result.time).format('lll') 
                    })  
                })
                return res.json(formattedResult)
            })
        } catch (error) {
            return res.status(400).json({msg: `Error getting all events`})
        }
    },

    addNewTodo: async (req, res) => {
        try {
            const { todo, time } = req.body
            const query = `INSERT INTO todos (todo, time) VALUES(?,?);`
            
            await conn.query(query, [todo,time], (err, result) => {
                if (err) console.log(err)
                return res.json({
                    id: result.insertId
                })
            })

        } catch (error) {
            return res.status(400).json({msg: `Error adding new todo`})
        }
        
    },
    deleteTodo: async (req, res) => {
        const {id} = req.params
        const query = `DELETE FROM todos WHERE id = ?`
        await conn.query(query, [id], (err, result) => {
            if (err) console.log(err) 
            return res.json({status: result.serverStatus})
        })
    },
    updateTodo: async (req, res) => {
        const { todo,time } = req.body
        const { id } = req.params
        if (todo && time) {
            const query = "UPDATE todos SET todo = ?,time = ? WHERE id = ?";
            await conn.query(query,[conn.escape(todo),time, id], (err, result) => {
                if (err) console.log(err) 
                return res.json(result)
            });
        } else if (!todo) {
            const query = "UPDATE todos SET time = ? WHERE id = ?";
            await conn.query(query,[time, id], (err, result) => {
                if (err) console.log(err) 
                return res.json(result)
            });
        } else {
            const query = "UPDATE todos SET todo = ? WHERE id = ?";
            await conn.query(query,[conn.escape(todo), id], (err, result) => {
                if (err) console.log(err) 
                return res.json(result)
            });
        }
    },
    getTodoByRegex: async (req, res) => {
        const { todoName } = req.params
        const regex = `%${todoName}%`
        const query = "SELECT * FROM todos WHERE todo LIKE ?";
        
        await conn.query(query, [regex], (err, result) => {
            if (err) {
                console.log(err)
                return res.json({ msg: 'No such todo' })
            }
            return res.json(result)
        })
        
    }
}