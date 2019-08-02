const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

let Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, `username is required`]
    },
    email:{
        type:String,
        validate: [{
            validator: function(value){
                return /\S+@\S+\.\S+/.test(value)
            },
            message: props => `${props.value} is not a valid email`
        },{
            validator: function (value) {
                return User.find({
                    _id: { $ne: this._id },
                    email: value
                })
                    .then(data => {
                        if (data.length !== 0) {
                            throw new Error('Email has been used')
                        }
                    })
                    .catch(err => {
                        throw err
                    });
            },
            message: props => `This email ${props.value} already used!`

        }], 
        required: [true, `email is required`] 
    },
    password: {
        type : String,
        minlength: [5, 'too short password'],
        required: [true, `password is required`]
    },
    role: {
        type: String,
        default: 'customer'
    }
},{timestamps : true})

userSchema.pre('save',function(next){ 
    this.password = bcrypt.hashSync(this.password,salt)
    next()
})
userSchema.post('findOneAndUpdate',function(doc,next){
    console.log('masuk hooks');
    console.log(doc.password);
    doc.password = bcrypt.hashSync(doc.password,salt)
    console.log(doc.password);
    console.log(doc._id);
    User.update({_id:doc._id},{password: doc.password})
    .then(result=>{
        console.log(result, "test update")
        next()

    }).catch(next)
    //lalkukan encrypt passwod disini
    //findByIdAndUpdate

  
})
const User = mongoose.model('User',userSchema)

module.exports = User