import {config} from "../config.js";
import SQ from "sequelize";
import mysql from "mysql2";

const {host,user,database,password} = config.db; // config.js 내에 있는 config 객체에서 key값이 db인 것들만 가져왔다.

export const sequelize = new SQ.Sequelize(database,user,password,{ // seuquelize를 사용하기 위해 기본 base를 설정하고 mysql db에 연결했다.
    host, // host : config.db.host
    dialect:"mysql",
    logging: false
});


const pool = mysql.createPool({ // mysql을 사용하기 위해 정의 해 놓고 mysql db에 연결했다.
    host:config.db.host,
    user:config.db.user,
    database:config.db.database,
    password:config.db.password
});

export const db = pool.promise();