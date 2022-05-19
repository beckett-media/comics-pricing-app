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


def insert_issue_codes():
    print("writing csv")
    with open("/tmp/codes.csv", "w") as dates_csv:
        for i, (uid, issue) in enumerate(issues().items(), start=1):
            codes = issue["upc"], issue["isbn10"], issue["isbn13"]
            upc, isbn10, isbn13 = [code if code else None for code in codes]

            dates_csv.write(f"{uid}\t{upc}\t{isbn10}\t{isbn13}\n")

    print("uploading codes")
    with db_conn() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TEMPORARY TABLE codes (
              issue_id UUID NOT NULL,
              upc TEXT,
              isbn10 TEXT,
              isbn13 TEXT
            ) ON COMMIT DROP;
            """
        )

        with open("/tmp/codes.csv") as dates_csv:
            cur.copy_from(
                dates_csv,
                "codes",
                null="None",
                columns=("issue_id", "upc", "isbn10", "isbn13"),
            )

        cur.execute(
            """
            UPDATE issues
            SET
              upc = codes.upc,
              isbn10 = codes.isbn10,
              isbn13 = codes.isbn13
            FROM codes
            WHERE codes.issue_id = issues.id
            """
        )


def main():
    insert_issue_codes()


if __name__ == "__main__":
    main()
