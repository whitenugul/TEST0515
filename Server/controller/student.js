import * as studentRepository from '../data/student.js';
import * as scoreRepository from '../data/score.js'

export async function addStudent(req, res) { // 학생 데이터를 추가한다.
    const {student_id, name, hp, email} = req.body
    const my_text = await(studentRepository.createStudent(student_id, name, hp, email))

    res.status(201).json(my_text);
}

export async function getStudent(req, res){ // 학생 데이터를 가져온다
    const data = await(scoreRepository.getStudentData())
    const rankingData = data.map((item, i) => {
        return {
            ranking: `${i+1}등`,
            data: item
    };
    });
    
    res.status(201).json({
        total: `총원은 ${data.length}명입니다.`,
        rankingData,
    });
}

export async function updateStudent(req, res){ // 학생 데이터를 갱신한다.
    const id = req.params.id
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    const student = await studentRepository.getById(id);
    if (!student){
        res.status(404).json({message: `${id}번 학생이 존재하지 않습니다.`})
    }
    const updated = await studentRepository.updateStudent_data(id,keys,values);
    res.status(201).send(updated)
}

export async function deleteStudent(req, res){ // 학생 데이터를 제거한다.
    const id = req.params.id
    const student = await studentRepository.getById(id);
    if (!student){
        res.status(404).json({message: `${id}번 학생이 존재하지 않습니다.`})
    }
    await studentRepository.deleteStudent_data(id)

    res.status(201).send({message: `${id}번 학생 데이터가 삭제되었습니다.`})
}

export async function getByStudentId(req, res){ // 학번으로 학생데이터를 가져온다.
    const student_id = req.params.student_id
    const result = await(scoreRepository.getStudentById(student_id))
        res.status(201).json(result)
}