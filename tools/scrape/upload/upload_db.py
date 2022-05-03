import os
import uuid

import psycopg2


def db_conn():
    return psycopg2.connect(
        dbname="comics",
        user="postgres",
        host=os.environ["PGHOST"],
        password=os.environ["PGPASSWORD"],
        port=5432,
    )


def publishers():
    publishers = []
    with open("data/clean/publishers.txt") as publishers_file:
        for line in publishers_file:
            publishers.append(eval(line.strip()))

    return publishers


def titles():
    titles = []
    with open("data/clean/titles.txt") as titles_file:
        for line in titles_file:
            titles.append(eval(line.strip()))

    return titles


def insert_publishers():
    with db_conn() as conn:
        cur = conn.cursor()

        ps = publishers()
        imprints = {}
        for p in ps:
            for i in p["imprints"]:
                imprints[i] = p["id"]

        print(imprints)

        ps_dict = {}

        for i, p in enumerate(ps, start=1):
            parent = imprints.get(p["id"])
            kind = "PUBLISHER" if parent is None else "IMPRINT"

            cur.execute(
                """
                INSERT INTO publishers (name, type, parent_publisher_id)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (p["name"], kind, None),
            )

            uid = cur.fetchone()[0]
            ps_dict[uid] = p

            print("publisher", i)

        with open("data/upload-cache/publishers_dict.txt", "w") as publishers_file:
            publishers_file.write(str(ps_dict))


def update_imprints():
    with open("data/upload-cache/publishers_dict.txt") as publishers_file:
        publishers = eval(publishers_file.read())

    rev = {}
    for uid, p in publishers.items():
        rev[p["id"]] = uid

    with db_conn() as conn:
        cur = conn.cursor()

        for i, (uid, p) in enumerate(publishers.items(), start=1):
            for imprint_id in p["imprints"]:
                imprint_uid = rev[imprint_id]
                cur.execute(
                    "UPDATE publishers SET parent_publisher_id = %s WHERE id = %s",
                    (uid, imprint_uid),
                )
            print(f"publisher {i}")


def insert_titles():
    with open("data/upload-cache/publishers_dict.txt") as publishers_file:
        publishers = eval(publishers_file.read())

    publishers_rev = {}
    for uid, p in publishers.items():
        publishers_rev[p["id"]] = uid

    ts = titles()
    titles_dict = {str(uuid.uuid4()): t for t in ts}
    print("writing cache")
    with open("data/upload-cache/titles_dict.txt", "w") as titles_file:
        titles_file.write(str(titles_dict))

    print("writing csv")
    with open("/tmp/titles.csv", "w") as titles_csv:
        for uid, t in titles_dict.items():
            puid = publishers_rev[t["publisher_id"]]
            titles_csv.write(f"{uid}\t{t['name'].strip()}\t{puid}\n")

    print("writing to db")
    with db_conn() as conn:
        cur = conn.cursor()
        with open("/tmp/titles.csv") as titles_csv:
            cur.copy_from(titles_csv, "titles", columns=("id", "name", "publisher_id"))


def main():
    insert_titles()


if __name__ == "__main__":
    main()
