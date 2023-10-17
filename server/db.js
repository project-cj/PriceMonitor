const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('mysql://root:@127.0.0.1:3306/inz_db')
sequelize.authenticate()
    .then((result)=>{
        console.log("Connected")
    }).catch((err)=>{
        console.log("Not connected")
    })
/*
sequelize.sync()
    .then((result)=>{
        console.log("Synched")
    }).catch((err)=>{
        console.log("Not synched")
    })
*/
module.exports = sequelize