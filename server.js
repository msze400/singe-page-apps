const {
    syncAndSeed,
    models: { User, Car, Sale },
    conn,
} = require('./db')
const express = require('express')
const path = require('path')

const app = express()
//get data as json data not urlencoded data
app.use(express.json())

//static directory
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next) =>
    res.sendFile(path.join(__dirname, 'index.html'))
)

app.use('/api', require('./api'))

const init = async () => {
    try {
        await syncAndSeed()
        const port = process.env.PORT || 4000
        app.listen(port, () => console.log(`listening on port ${port}`))
    } catch (ex) {
        console.log(ex)
    }
}

init()
