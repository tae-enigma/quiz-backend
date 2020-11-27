import express from "express";
import bodyParser from "bodyParser"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3333, () => console.log(`server its run`))