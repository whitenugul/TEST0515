import express from "express";
import * as scoreController from '../controller/score.js'

// express에 있는 router를 사용하기 위해 express.Router()를 router 변수로 정했다.
const router = express.Router();

// POST를 이용하여 학생의 점수를 등록한다.
router.post('/', scoreController.addScore); 
// controller폴더의 score.js 파일 내에 있는 addScore 함수를 사용한다.

// PUT을 이용하여 학생의 점수를 수정한다.
router.put('/:id', scoreController.updateScore)
// controller폴더의 score.js 파일 내에 있는 updateScore 함수를 사용한다.

// DELETE를 이용하여 학생의 점수를 수정한다.
router.delete('/:id', scoreController.deleteScore);
// controller폴더의 score.js 파일 내에 있는 deleteScore 함수를 사용한다.

export default router; // index.js에 있는 router를 위해 export default를 해준다.