import httpx

header_verification_token = "_b0S103x4AJEZuy7EbgempXJA9svATs1uQ8ahBi0YsW9y2BaOYb62hn6_HMw_IcVCMUOLDTWBWI1Se0WY1nSbUOmoe7tcxdFhrr3nmJHAlI1"
form_verification_token = "u4W-zbQEPlQ5o0e3RJ1zgoqgi4oQbv7uWEE66EnxKuH4oJlfN5PqRvBVEkem-NI6YUgRC-Qgzw8Mwt9nCKOdzmdXxfAHQU5bOJPxOkK1BAI1"
request_uid = "gQgOkGMg/D9c/xrrgL8EPg=="


def parse_publisher(item):
    imprints = item["Imprints"] or []

    return {
        "id": item["id"],
        "id_enc": item["idENC"],
        "name": item["name"],
        "url_name": item["nameSEO"],
        "logo": item["logo"],
        "logo_small": item["logoSm"],
        "title_count": int(item["titleCount"].replace(",", "")),
        "imprints": [imprint["id"] for imprint in imprints],
    }


def publishers(page):
    r = httpx.post(
        "https://comicspriceguide.com/Publisher/publishersReturn",
        timeout=20,
        headers={
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": f"__RequestVerificationToken={header_verification_token}",
            "user-agent": "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
        },
        data={
            "filter[page]": page,
            "filter[per_page]": "100",
            "filter[direction]": "asc",
            "filter[filterBy]": "",
            "filter[searchBy]": "",
            "filter[searchType]": "anywords",
            "filter[country]": "eUpr0LBL/Zh4z9+wa32vcg==",
            "info[text]": "",
            "info[uid]": request_uid,
            "info[sec]": "i/sXDoYis+NARUc6I9W61w==",
            "__RequestVerificationToken": form_verification_token,
        },
    )

    data = r.json()
    items = data["items"] or []
    letters = items[0]["letters"] if len(items) > 0 else []

    return {
        "letters": letters,
        "items": [parse_publisher(item) for item in items],
        "pages": data["pages"],
    }


def all_publishers():
    page = 1
    pages = 1

    while page <= pages:
        data = publishers(page)
        yield from data["items"]

        pages = data["pages"]
        page += 1


def parse_title(item):
    covers = item["coverScans"]

    return {
        "id": item["id"],
        "id_enc": item["idENC"],
        "name": item["name"],
        "url_name": item["nameSEO"],
        "comment": item["comment"],
        "cover": covers["lrgScan"],
        "cover_small": covers["thmScan"],
        "volume": item["volume"],
        "years": item["years"],
    }


def titles(publisher_id, page):
    r = httpx.post(
        "https://comicspriceguide.com/Publisher/TitlesReturn",
        timeout=20,
        headers={
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "cookie": f"__RequestVerificationToken={header_verification_token}",
            "user-agent": "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
        },
        data={
            "filter[page]": page,
            "filter[per_page]": "100",
            "filter[direction]": "asc",
            "filter[filterBy]": "all",
            "filter[searchBy]": "",
            "filter[searchTabs]": "searches",
            "info[pid]": publisher_id,
            "info[uid]": request_uid,
            "info[sec]": publisher_id,
            "__RequestVerificationToken": form_verification_token,
        },
    )

    data = r.json()
    items = data["items"] or []
    letters = items[0]["letters"] if len(items) > 0 else []

    return {
        "letters": letters,
        "items": [parse_title(item) for item in items],
        "pages": data["pages"],
    }


def all_titles(publisher_id):
    page = 1
    pages = 1

    while page <= pages:
        data = titles(publisher_id, page)
        yield from data["items"]

        pages = data["pages"]
        page += 1


def main():
    publishers = []
    with open("data/clean/publishers.txt", "w", buffering=1) as publishers_file:
        for i, publisher in enumerate(all_publishers(), start=1):
            publishers.append(publisher)
            publishers_file.write(f"{publisher}\n")
            print(f"writing publisher {i}")

    with open("data/clean/titles.txt", "w", buffering=1) as titles_file:
        i = 1

        for publisher in publishers:
            for title in all_titles(publisher["id"]):
                title["publisher_id"] = publisher["id"]
                titles_file.write(f"{title}\n")
                print(f"writing title {i}")

                i += 1


def restart():
    publishers = []
    with open("data/clean/publishers.txt") as publishers_file:
        for line in publishers_file:
            publishers.append(eval(line.strip()))

    titles = []
    with open("data/clean/titles.txt") as publishers_file:
        for line in publishers_file:
            titles.append(eval(line.strip()))

    publisher_ids = {publisher["id"] for publisher in publishers}
    for title in titles:
        publisher_ids.discard(title["publisher_id"])

    with open("data/clean/titles.txt", "a", buffering=1) as titles_file:
        i = len(titles) + 1

        for publisher_id in publisher_ids:
            for title in all_titles(publisher_id):
                title["publisher_id"] = publisher_id
                titles_file.write(f"{title}\n")
                print(f"writing title {i}")

                i += 1


if __name__ == "__main__":
    restart()
