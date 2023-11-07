const {Sequelize} = require('sequelize')
const SequelizeAuto = require('sequelize-auto');

const sequelize = new Sequelize('mysql://root:@127.0.0.1:3306/inz_db')
sequelize.authenticate()
    .then((result)=>{
        console.log("Connected")
    }).catch((err)=>{
        console.log("Not connected")
    })
    var initModels = require("./models2/init-models");

        //uncomment to auto-generate models from database

    // const output = "./models2";
    // const options = { directory: output, caseFile: 'l', caseModel: 'o', caseProp: 'o', lang: 'js', useDefine: true, singularize: false, spaces: true, indentation: 2 };
    
    // const config = {
    //     dialect: 'mysql',
    //     host: "localhost",
    //     port: 3306,
    //     dbname: "inz_db",
    //     user: "root",
    //     pass: "",
    //     ...options
    // };
    
    // var auto = new SequelizeAuto(config.dbname, config.user, config.pass, config);
    
    // auto.run().then(data => {
    //   const tableNames = Object.keys(data.tables);
    //   console.log(tableNames);
    // });

// sequelize.sync()
//     .then((result)=>{
//         console.log("Synched")
//     }).catch((err)=>{
//         console.log("Not synched")
//     })

module.exports = sequelize