const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../../models/productModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful! 💋');
  });

//READ JSON FILE
const products = JSON.parse(fs.readFileSync('products-simple.json', 'utf-8'));


//IMPORT DATA TO DB
const importData = async () => {
    try{
        await Product.create(products)
        console.log('Data successfully loaded!');
    }catch(err){
        console.log(err);
    }
};

//DELETE ALL DATA FROM COLLECTION
const delete 
