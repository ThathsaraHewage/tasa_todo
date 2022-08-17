const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        var uri = `mongodb://localhost:27017/todo`
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }, (err => {
            if (err) {
                console.log("Connection to database failed ")
                console.log(err)
            }
        }))
        console.log("Connection to database success ...")
    } catch (error) {
        console.log("Error")
    }
}
module.exports = connectDb;
