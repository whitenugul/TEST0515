import SQ, { Sequelize } from "sequelize";
import {sequelize} from "../db/database.js";

const DataTypes = SQ.DataTypes; // Sequelize의 DataTypes를 이용

export const Student = sequelize.define(
    "student",
    {
        id:{ //id는 일렬번호이면서 자동으로 증가하고 integer 타입이면서 primary key로 지정했고 null값은 허용하지 않았다.
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        student_id:{ // student_id는 학번으로 문자열 형태이면서 중복은 안되게 했고 null값도 허용하지 않았다.
            type:DataTypes.STRING(20),
            allowNull:false,
            unique:true
        },
        name:{ // name은 학생의 이름으로 문자열 형태에 null값은 허용하지 않았다.
            type:DataTypes.STRING(20),
            allowNull:false
        },
        hp:{ // hp는 전화번호로 문자열 형태이면서 null값은 허용하지 않았다.
            type:DataTypes.STRING(20),
            allowNull:false
        },
        email:{// email은 이메일로 문자열 형태이면서 null값은 허용하지 않았다.
            type:DataTypes.STRING(20),
            allowNull:false
        },
        regdate:{ // regdate는 등록된 날짜로 등록된 시점을 default값으로 설정했다.
            type:DataTypes.DATE, 
            defaultValue: DataTypes.NOW
        }
    },
    {timestamps: false}, // createdAt이랑 updatedAt을 나타나지 않게 하기 위해 false로 설정
    {freezeTableName: true} // mysql에서 table이름에 s가 안붙게 하려 했지만 붙음
)


export async function createStudent(student_id, name, hp, email){ // 학생 데이터를 생성하기 위한 함수
    return Student.create({student_id, name, hp, email}) // create 메소드를 이용하여 student 테이블에 데이터를 넣는다.
}

export async function getById(id){ // 해당 id의 학생이 있는지 확인
    return Student.findByPk(id) // findByPk는 primary key로 찾는다.
}

export async function updateStudent_data(id,keys,values){ // 학생 정보 수정을 위한 함수
    return Student.findByPk(id).then((result) => {
        for (let i = 0; i<keys.length;i++){ // 어떠한 정보를 수정할지 모르니 따로 개별적으로 key랑 value값을 나눠서 각각에 맞게 설정하고 저장을 한다.
            let key = keys[i] // req.body의 key값
            let value = values[i] // req.body의 value값
            result[key] = value // 내용 수정
        }
        return result.save();
    })
}

export async function deleteStudent_data(id){ // 학생 정보를 제거하기 위한 함수
    return Student.findByPk(id).then((result) => // primary_key로 값을 찾아 있으면 destroy함수로 제거한다.
    result.destroy())
}