const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        console.log(req.body);

        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
            .then((newuser) => {
                res.status(201).json(newuser)
            })
            .catch(next)
    }

    static changePassword(req, res, next){
        User.findByIdAndUpdate({_id: req.decoded.id},{password: req.body.password},{
            runValidators: true, new: true
        })
        .then((data)=>{
            console.log('ini datanya');
            
            console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body);

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                throw err
            } else {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let obj = {
                            id: user._id,
                            email: user.email
                        }
                        res.status(200).json({ token: jwt.sign(obj), role: user.role })

                    } else {
                        res.status(400).json({
                            message: "wrong password"
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "username wrong"
                    })
                }
            }
        })
    }

}

module.exports = UserController