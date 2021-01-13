    switch (process.env.NODE_ENV) {
        case 'development':
            process.env.port = 3000;
            // process.env.host = 'mongodb://localhost:27017/toDoNotes';
            process.env.host = 'mongodb+srv://shvi:shvi@123@cluster0.8nnhd.mongodb.net/toDoNotes?retryWrites=true&w=majority';
           
            break;
        case 'production' :
            process.env.port = 8000;
            process.env.host = 'mongodb+srv://shvi:shvi@123@cluster0.8nnhd.mongodb.net/toDoNotes?retryWrites=true&w=majority';
            
            break;
        default:
            
            process.env.port = 3000;
            process.env.host = 'mongodb+srv://shvi:shvi@123@cluster0.8nnhd.mongodb.net/toDoNotes?retryWrites=true&w=majority';
            
            break;
    }
