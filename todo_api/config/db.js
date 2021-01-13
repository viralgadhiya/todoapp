
const mongoose = require('mongoose');

mongoose.connect(process.env.host, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
        console.log("Database is connected...")
    },
    (err) => {
        console.log(err)
        /** handle initial connection error */
        console.log("Database is notconnected...")
    }
)


