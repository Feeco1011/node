import express from 'express'

//連線模組
// import db from '../utils/connect-mysql.js'
import db from '##/configs/mysql.js'
const router = express.Router()

router.get('/', async (req, res) => {
  const sql = `SELECT * FROM ct`
  const [rows] = await db.query(sql)
  res.json(rows)
})



router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const sql = `SELECT * FROM ct WHERE ct_id=${id}`
  const [rows] = await db.query(sql)
  if (rows.length) {
    return res.json(rows[0])
  } else {
    return res.json({})
  }
})

/*
// /api/comment/blog/:blogId
router.get('/blog/:blogId', async (req, res) => {
  const { blogId } = req.params // 從路徑參數中獲取 blogId
  try {
    const sql = `SELECT *
FROM ct
WHERE ct_id = ?;
    `
    // 查詢指定 blogId 的留言，並按照創建時間倒序排列
    const [rows] = await db.query(sql, [blogId]) // 執行查詢，並將 blogId 作為參數傳入
    res.json(rows) // 回傳留言資料
  } catch (error) {
    console.error('獲取留言失敗：', error) // 在伺服器端顯示錯誤訊息
    res.status(500).json({ error: '獲取留言失敗' }) // 回傳 500 錯誤和相應的錯誤訊息
  }
})
*/
export default router

// ct路由
