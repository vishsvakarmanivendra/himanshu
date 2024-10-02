import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import mysql2 from "mysql2"
dotenv.config()

console.log(process.env.DATABASE_PASSWORD,process.env.DATABASE_USER)
const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: false,
  });
sequelize.authenticate().then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
});

export default sequelize;



