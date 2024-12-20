import express from 'express'
// blog  匯入路由
import cors from 'cors'
import postsRouter from './posts.js'
import ctRouter from './ct.js'
import goodRouter from './good.js'
import ct_goodRouter from './ct_good.js'

const router = express.Router()
const app = express()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

export default router

app.use(cors())

//(blog大專使用到)
app.use('/posts', postsRouter)

// app.use('/ct', ctRouter)
// app.use('/good', goodRouter)
// app.use('/ct_good', ct_goodRouter)
// app.use('/api/messages', ctRouter)
