const {Schema,model} = require('mongoose')


const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      gender: {
        type: String,
        required: true,
      },
      publishDate: {
        type: Date,
        default: new Date(),
      },
      image: {
        type: String,
      },
})

const Movie = model('Movie',MovieSchema)

module.exports = Movie
