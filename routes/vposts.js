import express from 'express'

//連線模組
// import db from '../utils/connect-mysql.js'
import db from '##/configs/mysql.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM vposts`
  const [rows] = await db.query(sql)
  res.json(rows)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = `SELECT * FROM vposts WHERE pt_id=${id}`
  const [rows] = await db.query(sql)
  if (rows.length) {
    return res.json(rows[0])
  } else {
    return res.json({})
  }
})

export default router

// vposts路由
