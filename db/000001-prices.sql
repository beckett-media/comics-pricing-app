CREATE TABLE prices (
  issue_id UUID REFERENCES issues(id) NOT NULL,
  price REAL NOT NULL
);

INSERT INTO prices
SELECT
  issue_id,
  PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY price) AS price
FROM sales
GROUP BY issue_id;
