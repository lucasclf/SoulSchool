const express = require('express');
const router = express.Router();

const studentModel = require('./studentModel')

/* Definindo rotas do CRUD */

router.post('/', (req, res) => {
    let studentDocument = new studentModel({
        name: req.body.name,
        enrollment: req.body.enrollment,
        password: req.body.password,
        note: req.body.note
    })

    studentDocument.save((err, stud) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(stud)
        }
    })
})

router.get('/', (req, res) => {
    studentModel.find().exec((err, studs) =>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(studs)
        }
    })
})

module.exports = router