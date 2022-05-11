import csv

with open("data/kaggle/comics_data.csv", newline="") as csvfile:
    reader = csv.DictReader(csvfile, delimiter=",")
    for row in reader:
        if "Spider" in row["title"]:
            print(
                row["pub_name"], row["title"], row["issue"], row.get("hist_prices_link")
            )
