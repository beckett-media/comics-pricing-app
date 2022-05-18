-- popular_issues are the issues with the most transactions
CREATE MATERIALIZED VIEW popular_issues
AS SELECT
  issue_id,
  COUNT(*)
FROM sales
GROUP BY issue_id
ORDER BY COUNT(*) DESC
LIMIT 50;


-- popular_titles are the titles with the most issues
CREATE MATERIALIZED VIEW popular_titles
AS SELECT
  title_id,
  COUNT(*)
FROM issues
GROUP BY title_id
ORDER BY COUNT(*) DESC
LIMIT 50;
