import os
import random
from datetime import datetime, timedelta

import psycopg2
import psycopg2.extras


def db_conn():
    return psycopg2.connect(
        dbname="comics",
        user="postgres",
        host=os.environ["PGHOST"],
        password=os.environ["PGPASSWORD"],
        port=5432,
    )


def db_issues():
    with db_conn() as conn:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute("SELECT id FROM issues")
        for issue in cur:
            yield issue


GRADES = [
    "10.0",
    "9.9",
    "9.8",
    "9.6",
    "9.4",
    "9.2",
    "9.0",
    "8.5",
    "8.0",
    "7.5",
    "7.0",
    "6.5",
    "6.0",
    "5.5",
    "5.0",
    "4.5",
    "4.0",
    "3.5",
    "3.0",
    "2.5",
    "2.0",
    "1.8",
    "1.5",
    "1.0",
    "0.5",
]


def fake_prices():
    num_points = int(random.expovariate(0.5))
    initial_price = int(random.expovariate(0.01))

    diffs = [int(random.gauss(2, 10)) for _ in range(num_points + 1)]
    dists = [int(random.gammavariate(4, 5)) for _ in range(num_points + 1)]

    prices = [initial_price]
    dates = [datetime.today()]

    for diff, dist in zip(diffs, dists):
        prices.append(abs(prices[-1] + diff))
        dates.append(dates[-1] - timedelta(days=dist * 7))

    prices = prices[1:]
    dates = dates[1:]
    grades = [random.choice(GRADES) for _ in range(num_points + 1)]

    return (prices, dates, grades)


def main():

    print("writing csv")
    with open("/tmp/prices.csv", "w") as prices_csv:
        for issue in db_issues():
            prices, dates, grades = fake_prices()
            for price, date, grade in zip(prices, dates, grades):
                prices_csv.write(f"{issue['id']}\t{grade}\t{price}\t{date}\n")

    print("uploading prices")
    with db_conn() as conn:
        cur = conn.cursor()
        with open("/tmp/prices.csv") as prices_csv:
            cur.copy_from(
                prices_csv, "prices", columns=("issue_id", "grade", "price", "date")
            )


if __name__ == "__main__":
    main()
