const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkQueryParamMiddleware = (req, res, next) => {
  const { age } = req.query

  if (age) {
    return next()
  }
  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }
  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkQueryParamMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkQueryParamMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)
