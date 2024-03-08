//db.js Connection to MongoDB Atlas

const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://vishalmishra270799:Pd6uea80PQf9GPTf@cluster0.wqh5jlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    await mongoose
        .connect(mongoURI)
        .then(async () => {
            console.log('MongoDB Atlas connected successfully');
        })
        .catch((err) => console.log("Mongo Error", err))
}

module.exports = connectToMongo;