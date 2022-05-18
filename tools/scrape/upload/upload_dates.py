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


def insert_issues_dates():
    print("writing csv")
    with open("/tmp/dates.csv", "w") as dates_csv:
        for i, (uid, issue) in enumerate(issues().items(), start=1):
            month, year = issue["date"]["month"], issue["date"]["year"]
            month = month if month else None
            year = int(year) if year else None

            dates_csv.write(f"{uid}\t{month}\t{year}\n")

    print("uploading dates")
    with db_conn() as conn:
        cur = conn.cursor()
        with open("/tmp/dates.csv") as dates_csv:
            cur.copy_from(
                dates_csv, "dates", null="None", columns=("id", "month", "year")
            )


def main():
    insert_issues_dates()


if __name__ == "__main__":
    main()
