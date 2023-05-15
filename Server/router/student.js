import express from "express";
import * as studentController from "../controller/student.js"

// express에 있는 router를 사용하기 위해 express.Router()를 router 변수로 정했다.
const router = express.Router();

// POST를 이용한 학생 정보 등록
router.post('/student', studentController.addStudent);
// controller폴더의 student.js 파일 내에 있는 addStudent 함수를 사용한다.

// GET을 이용한 학생의 등록된 정보를 평균 점수로 내림차순으로 출력
router.get('/', studentController.getStudent);
// controller폴더의 student.js 파일 내에 있는 getStudent 함수를 사용한다.

// PUT을 이용한 학생 정보 수정
router.put('/:id', studentController.updateStudent);
// controller폴더의 student.js 파일 내에 있는 updateStudent 함수를 사용한다.

// DELETE를 이용한 학생 정보 삭제
router.delete('/:id', studentController.deleteStudent);
// controller폴더의 student.js 파일 내에 있는 deleteStudent 함수를 사용한다.

// GET을 이용하여 학번으로 학생의 정보를 찾기
router.get('/:student_id', studentController.getByStudentId )
// controller폴더의 student.js 파일 내에 있는 getByStudentId 함수를 사용한다.

export default router; // index.js에 있는 router를 위해 export default를 해준다.