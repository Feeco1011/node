import express from 'express'

// //連線模組
// import db from '../utils/connect-mysql.js'
import db from '##/configs/mysql.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM cityposts`
  const [rows] = await db.query(sql)
  res.json(rows)
})

export default router

// cityposts路由
