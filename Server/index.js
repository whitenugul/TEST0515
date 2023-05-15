import express from "express";
import cors from "cors";
import morgan from "morgan";
import studentRouter from "./router/student.js";
import scoreRouter from "./router/score.js";
import {config} from "./config.js";
import {sequelize} from "./db/database.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny")); // 사용자들이 들어오게되면 로그를 콘솔에 찍어줌

app.use("/student", studentRouter); // 학생들에 관해 다룬다.
app.use("/score", scoreRouter); // 점수에 대해 다룬다.

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    const sever = app.listen(config.host.port);
});