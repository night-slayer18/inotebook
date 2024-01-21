const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name',"Enter a valid Name").isLength({ min: 3 }),
    body('email',"Enter a valid Email").isEmail(),
    body('password').isLength({ min: 8 }),
], (req, res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user)).catch(err=>{console.log(err)
        res.json({error:"please enter unique value",Message:err})});
});

module.exports = router;