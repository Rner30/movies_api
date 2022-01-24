const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
      movies: [
        {
         movie_id:{
          type: Schema.Types.ObjectId,
          ref: "Movie",
         },
         seconds:{type:String}
        },
      ],
})

const User = model('User',UserSchema)


module.exports = User