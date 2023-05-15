import {Student} from "../data/student.js"
import SQ, { Sequelize } from "sequelize";
import {sequelize} from "../db/database.js";
import {db} from "../db/database.js"

const DataTypes = SQ.DataTypes;

export const Score = sequelize.define(
    "score",
    {
        score_id:{ // score_id는 일련번호이면서 primary_key로 지정해 놨다.
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Java_score:{ // java 점수로 integer 형태이다.
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        Python_score:{ // Python 점수로 integer 형태이다.
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        C_score:{ // C 점수로 integer 형태이다.
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        total:{ // java, python, C 점수를 모두 합친 것
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        average:{ // java, python, C 점수의 평균
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        regdate:{ // 점수가 등록된 날짜
            type:DataTypes.DATE, 
            defaultValue: DataTypes.NOW
        }
    },
    {timestamps: false}, // createdAt이랑 updatedAt을 나타나지 않게 하기 위해 false로 설정
    {freezeTableName: true} // mysql에서 table이름에 s가 안붙게 하려 했지만 붙음
)

Score.belongsTo(Student, { foreignKey: 'score_id'}) // score와 student를 join 시켰다.

const INCLUDE_STUDENT = { // INCLUDE_STUDENT로 join된 함수 생성
    attributes:[
        "score_id",
        [Sequelize.col("student.student_id"), "student_id"],
        [Sequelize.col("student.name"), "name"],
        [Sequelize.col("student.hp"), "hp"],
        [Sequelize.col("student.email"), "email"],
        "Java_score",
        "Python_score",
        "C_score",
        "total",
        "average"
    ],
    include:{
        model:Student,
        attributes: []
    }
}

const ORDER_DESC = { // 평균을 기준으로 내림차순을 정하다가 점수가 같을 경우 학번으로 내림차순을 정한다.
    order: [["average", "DESC"], ["student_id", "DESC"]]
}

export async function createScore(score_id, Java_score, Python_score, C_score, total, average){ // 점수 데이터를 넣는 함수
    return Score.create({score_id, Java_score, Python_score, C_score, total, average})
}

export async function getById(id){ // id값에 해당하는 score 정보를 가져다 준다.
    return Score.findByPk(id)
}

export async function getStudentData(){
    return Score.findAll({ // 학생데이터를 점수와 함께 내림차순으로 정렬하여 나타낸다.
        ...INCLUDE_STUDENT, ...ORDER_DESC
    })
}
export async function getStudentById(student_id){ // 학번에 해당하는 정보와 점수를 가져온다.
    return Student.findOne({ 
        where: {student_id},
        attributes:['id']
    }).then(result => {
        return Score.findOne({
            where: {score_id : result.id},
            ...INCLUDE_STUDENT
        })
    })
}

export async function update_Score_data(id, data){ // 점수를 갱신한다.
    const keys = Object.keys(data)
    const values = Object.values(data)

    let total = 0 // java, python, C언어의 점수 변동에 따라 total이 달라지니 정의를 해둬서 더한다.
    Score.findOne({attributes: ['Java_score','Python_score', 'C_score'], 
    where: {score_id: id}}) // java, python, C 중에서 안 바뀌는 점수도 있을테니 이를 고려하여 한든다.
    .then(result => {
        const { Java_score: java, Python_score: python, C_score: C } = result;
        return { java, python, C }; // 객체 형태로 반환
    }).then(({ java, python, C }) => {
    if (keys.includes("Java_score")){
        total += values[keys.indexOf("Java_score")]
    } else{
        total += java
    }
    if (keys.includes("Python_score")){
        total += values[keys.indexOf("Python_score")]
    }else{
        total += python 
    }
    if (keys.includes("C_score")){
        total += values[keys.indexOf("C_score")]
    }else{
        total += C 
    }
    return total
    })
    .then(total => { // mysql문을 이용하여 update를 진행한다.
        let execute = "" // SQL 명령문에 맞게 고치기 위해 만들었다
        for (let i = 0; i < keys.length; i++){
            let string = `${keys[i]}=`+"'"+values[i]+"'"+` `
            if (i < keys.length - 1) {
                string += `, `
            }
            execute += string
        }
        const order = `update scores set ${execute},total=${total},average=${total/3} where score_id=${id}`
        console.log(order)
        return db.execute(order).then(() => {
            return getById(id);
        });
    })
}

export async function delete_Score_data(id){ // primary key로 id값에 해당하는 점수 데이터를 제거한다.
    return Score.findByPk(id).then((score) => {
        score.destroy();
    });
}