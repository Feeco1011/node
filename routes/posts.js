import express from 'express'

//連線模組
// import db from '../utils/connect-mysql.js'
import db from '##/configs/mysql.js'

const router = express.Router()

// 熱門
router.get('/recommend', async (req, res) => {
  const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id ORDER BY pt_created DESC LIMIT 10`
  const [rows] = await db.query(sql)
  res.json(rows)
})

// 分類
router.get('/category/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  console.log('eddie', id)

  if (id === 0) {
    const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id ORDER BY pt_id ASC LIMIT 6`
    const [rows] = await db.query(sql)
    return res.json(rows)
  }

  const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id WHERE pt_category_id=${id} LIMIT 6`
  const [rows] = await db.query(sql)
  res.json(rows)
})

// 城市
router.get('/city/:cityName', async (req, res) => {
  const cityName = req.params.cityName

  if (cityName === '全部') {
    const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id ORDER BY pt_id DESC LIMIT 6`
    const [rows] = await db.query(sql)
    return res.json(rows)
  }

  const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id WHERE pt_city='${cityName}' LIMIT 6`
  const [rows] = await db.query(sql)
  res.json(rows)
})

router.get('/postId/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = `SELECT posts.*,member.username FROM posts LEFT JOIN member ON posts.user = member.id WHERE pt_id=${id}`
  const [rows] = await db.query(sql)

  // comments data
  const sql2 = `SELECT ct.*,member.username FROM ct LEFT JOIN member ON ct.m_id = member.id WHERE pt_id=${id}`
  const [rows2] = await db.query(sql2)

  if (rows.length) {
    rows[0].messages = rows2
    return res.json(rows[0])
  } else {
    return res.json({})
  }
})

router.post('/addMessage', async (req, res) => {
  const userId = parseInt(req.body.member_id)
  const postId = req.body.pt_id
  const message = req.body.ct_sf
  console.log(userId, postId, message)

  const sql = `INSERT INTO ct(pt_id,m_id,ct_sf) VALUES (${postId},${userId},'${message}')`
  const [rows] = await db.query(sql)

  return res.json({ status: '200' })
})

export default router

// posts路由
