import dotenv from 'dotenv';
dotenv.config(); //.env 파일의 내용을 다루기 위해 config()이용

function required(key, defaultValue = undefined) { // .env 파일의 내용들의 형태는 key=value 형태이다.
    const value = process.env[key] || defaultValue; // 여기에서 .env 파일 내에 key값에 대한 value값이 없을 경우 value라는 변수에 defaultValue가 들어가게 된다. 그러나 defaultValue도 따로 정의해 주지 않을 경우 undefined가 들어가게 된다.
    if(value == null){ // value에 null 값이 들어가게 될 경우 정의가 되지 않은 것이므로 정의 되지 않았다고 error를 보낸다.
        throw new Error(`Key ${key} is undefined`)
    }
    return value;
}

export const config = { // 예를 들어 SERVER)_PORT를 이용하고 싶다면 config.host.port로 불러올 수 있다.
    host:{
        port: parseInt(required("SERVER_PORT", 8080))
    },
    db:{
        host:required("DB_HOST"),
        user:required("DB_USER"),
        database:required("DB_DATABASE"),
        password:required("DB_PASSWORD")
    }
}