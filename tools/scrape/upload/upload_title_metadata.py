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


def titles():
    with open("data/upload-cache/titles_dict.txt") as titles_file:
        return eval(titles_file.read())


def insert_title_metadata():
    print("writing csv")
    with open("/tmp/title_metadata.csv", "w") as metadata_csv:
        for i, (uid, title) in enumerate(titles().items(), start=1):
            columns = title["volume"], title["comment"]
            volume, comment = [c if c else None for c in columns]

            metadata_csv.write(f"{uid}\t{volume}\t{comment}\n")

    print("uploading metadata")
    with db_conn() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TEMPORARY TABLE title_metadata (
              title_id UUID NOT NULL,
              volume TEXT,
              comment TEXT
            ) ON COMMIT DROP;
            """
        )

        with open("/tmp/title_metadata.csv") as dates_csv:
            cur.copy_from(
                dates_csv,
                "title_metadata",
                null="None",
                columns=("title_id", "volume", "comment"),
            )

        cur.execute(
            """
            UPDATE titles
            SET
              volume = title_metadata.volume,
              comment = title_metadata.comment
            FROM title_metadata
            WHERE title_metadata.title_id = titles.id
            """
        )


def main():
    insert_title_metadata()


if __name__ == "__main__":
    main()
