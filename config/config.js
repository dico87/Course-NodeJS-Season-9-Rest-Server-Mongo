process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000;
process.env.BCRYPT_ROUNDS = 10;
//Data base url
if(process.env.NODE_ENV === 'dev') { 
    process.env.URL_DB = process.env.URL_DB || 'mongodb://localhost:27017/coffee';
} else {
    process.env.URL_DB = process.env.URL_DB || 'mongodb+srv://dcortes:Skateboard87@cluster0-a0qyw.mongodb.net/coffee?retryWrites=true&w=majority';
}