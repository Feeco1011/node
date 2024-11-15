SELECT *
FROM my_product;

-- 單選(查詢字串: brand=Apple)
SELECT *
FROM my_product
WHERE brand = 'Apple';

-- 複選(查詢字串: brands=Apple,Google)
-- OR寫法(資料集合會擴大)
SELECT *
FROM my_product
WHERE brand = 'Apple' OR brand = 'Google';

-- IN寫法
SELECT *
FROM my_product
WHERE brand IN ('Apple', 'Google');

-- 關鍵字(查詢字串: name_lie=me)
SELECT *
FROM my_product
WHERE name LIKE '%me%';

-- 價格區間 5000~15000 (查詢字串: price_lte=15000&price_gte=5000)
-- AND寫法
SELECT *
FROM my_product
WHERE price >= 5000 AND price <= 15000;

-- BETWEEN x AND y
SELECT *
FROM my_product
WHERE price BETWEEN 5000 AND 15000;

-- WHERE整合測試
-- 查詢字串: brands=Apple,Google&name_lie=e&price_lte=15000&price_gte=5000
-- 每個條件間是用AND相接(資料集合會縮小)
SELECT *
FROM my_product
WHERE brand IN ('Apple', 'Google')
AND name LIKE '%e%'
AND price >= 5000 AND price <= 15000;

-- 排序(查詢字串: sort=price&order=asc)
-- 語法位置在WHERE從句後面
-- ASC 順向(123) DESC逆向(321)
SELECT *
FROM my_product
WHERE brand IN ('Apple', 'Google')
ORDER BY price ASC;

-- 分頁(查詢字串: page=2&perpage=5)
-- 公式: limit = perpage
--       offset = (page-1) * perpage
SELECT *
FROM my_product
WHERE brand IN ('Apple', 'Google')
ORDER BY price ASC
LIMIT 5 OFFSET 5;

-- 額外要計算在此條件下共有多少筆資料(註: 不需要ORDER BY和LIMIT OFFSET)
SELECT COUNT(*) AS count
FROM my_product
WHERE brand IN ('Apple', 'Google');
