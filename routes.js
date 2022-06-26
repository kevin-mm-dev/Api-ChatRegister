const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM users_test_kevin_joel_martinez_meraz', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO users_test_kevin_joel_martinez_meraz set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario added!')
        })
    })
})


module.exports = routes