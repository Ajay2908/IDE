const express = require('express')
const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')


const app = express()

app.use(express.json())

app.use(express.static('./public'))


app.post('/savecode/:mode', (req, res) => {
    const language = req.params.mode;
    const current_path = path.resolve(__dirname, 'runners', language, `A.${language}`);
    fs.writeFileSync(current_path, req.body['data']);
    res.end();

})
app.post('/saveinput/:mode', (req, res) => {
    const language = req.params.mode;
    const current_path = path.resolve(__dirname, 'runners', language, `A.txt`);
    fs.writeFileSync(current_path, req.body['data']);
    res.end();
})

app.get('/getcode/:mode', (req, res) => {
    const language = req.params.mode;
    const current_path = path.resolve(__dirname, 'templates', `A.${language}`);
    const result = fs.readFileSync(current_path, { encoding: 'utf8', flag: 'r' });
    const tosend = {
        data: result,
    }
    res.json(tosend);
})


app.get('/run/:mode', (req, res) => {
    const language = req.params.mode;
    const current_path = path.resolve(__dirname, 'runners', language);
    if (language === 'cpp') {
        let output;
        try {
            output = execSync("g++ -DLOCAL -std=c++17 A.cpp -o A && ./A < A.txt 2>&1", { cwd: current_path, timeout: 5000 }).toString();
            res.json({ success: output });
        }
        catch (e) {
            res.json({ success: e.toString() })
        }

    }
    else if (language === 'py') {
        let output;
        try {
            output = execSync("python3 A.py < A.txt", { cwd: current_path, timeout: 5000 }).toString();
            res.json({ success: output });
        }
        catch (e) {
            res.json({ success: e.toString() })
        }

    }
    else if (language === 'java') {
        let output;
        try {
            output = execSync(`javac A.java && java A < A.txt`, { cwd: current_path, timeout: 5000 }).toString();
            res.json({ success: output });
        }
        catch (e) {
            res.json({ success: e.toString() })
        }

    }

})


app.listen(5000, () => {
    console.log("Listening to 5000");
})