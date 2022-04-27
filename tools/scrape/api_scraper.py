import httpx

letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ@"


def publishers(letter, page):
    r = httpx.post(
        "https://comicspriceguide.com/Publisher/publishersReturn",
        headers={
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "origin": "https://comicspriceguide.com",
            "cookie": "ASP.NET_SessionId=t1dnutqli0md5qikfsny4r5j; __RequestVerificationToken=_b0S103x4AJEZuy7EbgempXJA9svATs1uQ8ahBi0YsW9y2BaOYb62hn6_HMw_IcVCMUOLDTWBWI1Se0WY1nSbUOmoe7tcxdFhrr3nmJHAlI1",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-requested-with": "XMLHttpRequest",
            "user-agent": "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            # not in header?
            "referrer": "https://comicspriceguide.com/publishers/bad-cat-studios",
            "referrerPolicy": "strict-origin-when-cross-origin",
        },
        data={
            "filter[page]": page,
            "filter[per_page]": "100",
            "filter[direction]": "asc",
            "filter[filterBy]": "",
            "filter[searchBy]": "",
            "filter[searchType]": "anywords",
            "filter[letter]": letter,
            "filter[country]": "eUpr0LBL/Zh4z9+wa32vcg==",
            "info[text]": "",
            "info[uid]": "NAMFcYaWWVtBVnKAEcKOQmFVeB8STmaGKexvj0Cv9r72FndhzeQpUPhyemDSJaKX+gAF2+f1VMCE7duPC7nacg==",
            "info[sec]": "i/sXDoYis+NARUc6I9W61w==",
            "__RequestVerificationToken": "u4W-zbQEPlQ5o0e3RJ1zgoqgi4oQbv7uWEE66EnxKuH4oJlfN5PqRvBVEkem-NI6YUgRC-Qgzw8Mwt9nCKOdzmdXxfAHQU5bOJPxOkK1BAI1",
        },
    )

    data = r.json()
    return {
        "items": [
            {"name": item["nameSEO"], "id": item["id"]} for item in data["items"] or []
        ],
        "pages": data["pages"],
    }


def all_publishers():
    for letter in letters:
        page = 1
        pages = 1

        while page <= pages:
            data = publishers(letter, page)

            yield from data["items"]

            page += 1
            pages = data["pages"]


def titles(publisher, letter, page):
    name, pid = publisher["name"], publisher["id"]

    r = httpx.post(
        "https://comicspriceguide.com/Publisher/TitlesReturn",
        headers={
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "origin": "https://comicspriceguide.com",
            "cookie": "ASP.NET_SessionId=t1dnutqli0md5qikfsny4r5j; __RequestVerificationToken=_b0S103x4AJEZuy7EbgempXJA9svATs1uQ8ahBi0YsW9y2BaOYb62hn6_HMw_IcVCMUOLDTWBWI1Se0WY1nSbUOmoe7tcxdFhrr3nmJHAlI1",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-requested-with": "XMLHttpRequest",
            "user-agent": "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            # not in header?
            "referrer": f"https://comicspriceguide.com/publishers/{name}",
            "referrerPolicy": "strict-origin-when-cross-origin",
        },
        data={
            "filter[page]": page,
            "filter[per_page]": "100",
            "filter[direction]": "asc",
            "filter[filterBy]": "all",
            "filter[searchBy]": "",
            "filter[searchTabs]": "searches",
            "filter[letter]": letter,
            "info[pid]": pid,
            "info[uid]": "NAMFcYaWWVtBVnKAEcKOQmFVeB8STmaGKexvj0Cv9r72FndhzeQpUPhyemDSJaKX+gAF2+f1VMCE7duPC7nacg==",
            "info[sec]": "i/sXDoYis+NARUc6I9W61w==",
            "__RequestVerificationToken": "u4W-zbQEPlQ5o0e3RJ1zgoqgi4oQbv7uWEE66EnxKuH4oJlfN5PqRvBVEkem-NI6YUgRC-Qgzw8Mwt9nCKOdzmdXxfAHQU5bOJPxOkK1BAI1",
        },
    )

    data = r.json()
    return {
        "items": [item["nameSEO"] for item in data["items"] or []],
        "pages": data["pages"],
    }


def all_titles():
    for publisher in all_publishers():
        for letter in letters:
            page = 1
            pages = 1

            while page <= pages:
                data = titles(publisher, letter, page)

                yield from data["items"]

                page += 1
                pages = data["pages"]


def main():
    for title in all_titles():
        print(title)


if __name__ == "__main__":
    main()
