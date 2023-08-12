const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // we'll store the uploaded file in memory
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    const html = `
        <html>
            <body>
                <form ref='uploadForm' 
                    action='/upload' 
                    method='post' 
                    encType="multipart/form-data">
                        <input type="file" name="sampleFile" accept=".txt" />
                        <input type='submit' value='Upload!' />
                </form>         
            </body>
        </html>`;
    res.send(html);
});

app.post('/upload', upload.single('sampleFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const content = req.file.buffer.toString();
    const lines = content.split(/\r?\n/).filter(line => line);  // filters out any empty lines
    console.log(lines);
    res.json(lines);
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
