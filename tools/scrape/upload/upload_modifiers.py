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


def issues_name_modifiers():
    with open("data/upload-cache/issues_alternate_dict.txt") as issues_file:
        return eval(issues_file.read())


def insert_issues_name_modifiers():
    with db_conn() as conn:
        cur = conn.cursor()

        for i, (uid, name_modifier) in enumerate(
            issues_name_modifiers().items(), start=1
        ):
            if name_modifier:
                cur.execute(
                    "UPDATE issues SET name_modifier = %s WHERE id = %s",
                    (name_modifier, uid),
                )

            print("issue", i)


def main():
    insert_issues_name_modifiers()


if __name__ == "__main__":
    main()
