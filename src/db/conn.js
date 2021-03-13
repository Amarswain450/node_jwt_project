const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/regEmp', {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected...!!!');
}).catch(() => {
    console.log('no connection....!!!');
});