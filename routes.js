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

// routes.post('/create-table', (req, res)=>{
//     req.getConnection((err, conn)=>{
//         if(err) return res.send(err)
//         conn.query("DROP TABLE IF EXISTS `testing_ali_fullstack`.`users_test_kevin_joel_martinez_meraz`; CREATE TABLE `testing_ali_fullstack`.`users_test_kevin_joel_martinez_meraz` ( `id` INT NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(50) NOT NULL , `segundo_nombre` VARCHAR(50) NOT NULL , `apellido_paterno` VARCHAR(100) NOT NULL , `apellido_materno` VARCHAR(100) NOT NULL , `fecha_nacimiento` VARCHAR(50) NOT NULL , `email` VARCHAR(200) NOT NULL , `telefono` VARCHAR(16) NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM; ", (err, rows)=>{
//             if(err) return res.send(err)

//             res.send('create-table added!')
//         })
//     })
// })

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM users_test_kevin_joel_martinez_meraz WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE users_test_kevin_joel_martinez_meraz set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario updated!')
        })
    })
})

module.exports = routes