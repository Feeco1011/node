import express from 'express'

//連線模組
import db from '../utils/connect-mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM catoposts`
  const [rows] = await db.query(sql)
  res.json(rows)
})

export default router

// catoposts路由
