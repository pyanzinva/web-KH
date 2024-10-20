const express = require('express');
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());

app.post('/profile', function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
}) 

app.get('/', (req, res) => {
    res.send('Hello World!'); // отправка ответа
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});