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


def insert_issue_metadata():
    print("writing csv")
    with open("/tmp/issue_metadata.csv", "w") as metadata_csv:
        for i, (uid, issue) in enumerate(issues().items(), start=1):
            age, cover_price = issue["age"]["name"], issue["cover_price"]
            cover_price = cover_price if cover_price else None

            metadata_csv.write(f"{uid}\t{age}\t{cover_price}\n")

    print("uploading metadata")
    with db_conn() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TEMPORARY TABLE issue_metadata (
              issue_id UUID NOT NULL,
              age TEXT NOT NULL,
              cover_price TEXT
            ) ON COMMIT DROP;
            """
        )

        with open("/tmp/issue_metadata.csv") as metadata_csv:
            cur.copy_from(
                metadata_csv,
                "issue_metadata",
                null="None",
                columns=("issue_id", "age", "cover_price"),
            )

        cur.execute(
            """
            UPDATE issues
            SET
              age = issue_metadata.age,
              cover_price = issue_metadata.cover_price
            FROM issue_metadata
            WHERE issue_metadata.issue_id = issues.id
            """
        )


def main():
    insert_issue_metadata()


if __name__ == "__main__":
    main()
