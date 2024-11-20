import express from 'express'

//連線模組
// import db from '../utils/connect-mysql.js'
import db from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const sql = `SELECT posts.*, member.username FROM posts LEFT JOIN member ON posts.user = member.id`
  const [rows] = await db.query(sql)
  res.json(rows)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = `SELECT posts.*, member.username FROM posts LEFT JOIN member ON posts.user = member.id WHERE pt_id=${id}`
  const [rows] = await db.query(sql)

  // comments data
  const sql2 = `SELECT ct.* , member.username FROM ct LEFT JOIN member ON ct.m_id = member.id WHERE pt_id=${id}`
  const [rows2] = await db.query(sql2)

  if (rows.length) {
    rows[0].messages = rows2
    return res.json(rows[0])
  } else {
    return res.json({})
  }
})
export default router

// posts路由
