import express from 'express'
const router = express.Router()

// 資料庫使用，使用原本的mysql2 + sql
import db from '##/configs/mysql.js'

// GET - 得到所有會員資料
router.get('/', async function (req, res) {
  // 分頁(查詢字串: page=2&perpage=5)
  // 公式: limit = perpage
  //     offset = (page-1) * perpage
  // 因為要作數學運算，所以一定要轉數字
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  const limit = perpage
  const offset = (page - 1) * perpage

  const [rows] = await db.query(
    `SELECT * FROM my_product LIMIT ${limit} OFFSET ${offset}`
  )
  const products = rows

  // 額外要計算在此條件下共有多少筆資料(註: 不需要ORDER BY和LIMIT OFFSET)
  const [rows2] = await db.query(`SELECT COUNT(*) AS count FROM my_product`)
  const { count } = rows2[0]

  // 計算總頁數
  const pageCount = Math.ceil(count / perpage)

  // 處理如果沒找到資料

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: {
      total: count, // 總資料筆數
      pageCount, // 總頁數
      page, // 目前頁數
      perpage, // 每頁筆數
      products, // 商品資料
    },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  // 轉為數字(為什麼要轉為數字請見下面的說明)
  const id = Number(req.params.id)

  //id的類型必需要和模型的pk主鍵一致(註: 因為在模型裡是定義為"整數值"，自動遞增pk主鍵)
  const [rows, fields] = await db.query(
    'SELECT * FROM my_product WHERE id = ?',
    [id]
  )

  return res.json({ status: 'success', data: { product: rows[0] } })
})

export default router