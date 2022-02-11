const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(history())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '/dist/index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))