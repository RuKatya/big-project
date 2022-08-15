const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const colors = require('colors');
const app = express();
const PORT = process.env.PORT || 7894

require('dotenv').config()

app.use(cookieParser())
app.use(express.json())

const { mongoDBconnect } = require('./ConnectDB')
mongoDBconnect();

app.use(express.static('client/build'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

try {
    app.listen(PORT, () => {
        console.log(`listen on http://localhost:${PORT}`.inverse.white)
    })
} catch (error) {
    console.log(error.red)
}