-- sales_count are the titles with count of sales in the past 2 months
CREATE MATERIALIZED VIEW sales_count
AS SELECT
    sales.issue_id,
    COUNT(*) AS sales_count
FROM sales
WHERE sales.date >= (SELECT DATE_TRUNC('DAY', NOW() - INTERVAL '2 MONTH'))
GROUP BY sales.issue_id
ORDER BY sales_count DESC

-- price_comparison are the titles price subtracted from the previous sale
CREATE MATERIALIZED VIEW recent_sales
AS WITH recent_sales AS  (
  SELECT DISTINCT
    sales.issue_id,
    sales.date,
    sales.price
  FROM sales
  LEFT OUTER JOIN sales sales2
    ON (sales.issue_id = sales2.issue_id AND sales.date < sales2.date)
  WHERE sales2.issue_id IS NULL AND (NOW() - INTERVAL '1 MONTH') < sales.date
)
SELECT
  recent_sales.issue_id,
  recent_sales.date,
  recent_sales.price - prices.price AS price_change
FROM recent_sales
JOIN prices ON prices.issue_id = recent_sales.issue_id
ORDER BY price_change ASC
LIMIT 20
