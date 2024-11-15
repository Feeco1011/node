import express from 'express'
const router = express.Router()

// 資料庫使用
import { Op } from 'sequelize'
import sequelize from '#configs/db.js'
const { My_Product } = sequelize.models

// GET - 得到所有會員資料
router.get('/', async function (req, res) {
  const products = await My_Product.findAll({
    logging: console.log, // (除錯)在終端機中呈現sql
  })
  // 處理如果沒找到資料

  // 標準回傳JSON
  return res.json({ status: 'success', data: { products } })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  // 轉為數字(為什麼要轉為數字請見下面的說明)
  const id = Number(req.params.id)

  //id的類型必需要和模型的pk主鍵一致(註: 因為在模型裡是定義為"整數值"，自動遞增pk主鍵)
  const product = await My_Product.findByPk(id, {
    raw: true, // 只需要資料表中資料
    logging: console.log, // (除錯)在終端機中呈現sql
  })

  return res.json({ status: 'success', data: { product } })
})

export default router
