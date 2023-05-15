import * as scoreRepository from '../data/score.js';

export async function addScore(req, res){ // 점수 데이터 추가
    const {score_id, Java_score, Python_score, C_score} = req.body
    const total = Java_score + Python_score + C_score
    const average = total / 3
    const score = await(scoreRepository.createScore(score_id, Java_score, Python_score, C_score, total, average))
    res.status(201).json(score)
}

export async function updateScore(req, res){ // 점수 데이터 갱신
    const id = req.params.id
    const data = req.body
    const confirm_score = await(scoreRepository.getById(id))

    if(!confirm_score){
        res.status(404).send(`${id}에 등록된 점수가 없습니다.`)
    }

    await(scoreRepository.update_Score_data(id, data))
    res.status(201).send("갱신되었습니다.")
}

export async function deleteScore(req, res){ // 점수 데이터 제거
    const id = req.params.id
    const confirm_score = await(scoreRepository.getById(id))
    if(!confirm_score){
        res.status(404).send(`${id}에 등록된 점수가 없습니다.`)
    }
    await (scoreRepository.delete_Score_data(id))
    res.send(204)
}