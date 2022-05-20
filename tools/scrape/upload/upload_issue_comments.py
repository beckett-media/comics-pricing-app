import os

import psycopg2


def db_conn():
    return psycopg2.connect(
        dbname="comics",
        user="postgres",
        host=os.environ["PGHOST"],
        password=os.environ["PGPASSWORD"],
        port=5432,
    )


def issues():
    with open("data/upload-cache/issues_dict.txt") as issues_file:
        return eval(issues_file.read())


def insert_issue_comments():
    print("writing csv")
    with open("/tmp/issue_comments.csv", "w") as comments_csv:
        for i, (uid, issue) in enumerate(issues().items(), start=1):
            comment = issue["comments"].replace("\r\n", " ")
            comment = comment if comment else None

            comments_csv.write(f"{uid}\t{comment}\n")

    print("uploading comments")
    with db_conn() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TEMPORARY TABLE issue_comments (
              issue_id UUID NOT NULL,
              comment TEXT
            ) ON COMMIT DROP;
            """
        )

        with open("/tmp/issue_comments.csv") as comments_csv:
            cur.copy_from(
                comments_csv,
                "issue_comments",
                null="None",
                columns=("issue_id", "comment"),
            )

        cur.execute(
            """
            UPDATE issues
            SET
              comment = issue_comments.comment
            FROM issue_comments
            WHERE issue_comments.issue_id = issues.id
            """
        )


def main():
    insert_issue_comments()


if __name__ == "__main__":
    main()
