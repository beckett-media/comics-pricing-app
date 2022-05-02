from pprint import pprint

import httpx

header_verification_token = "_b0S103x4AJEZuy7EbgempXJA9svATs1uQ8ahBi0YsW9y2BaOYb62hn6_HMw_IcVCMUOLDTWBWI1Se0WY1nSbUOmoe7tcxdFhrr3nmJHAlI1"
form_verification_token = "u4W-zbQEPlQ5o0e3RJ1zgoqgi4oQbv7uWEE66EnxKuH4oJlfN5PqRvBVEkem-NI6YUgRC-Qgzw8Mwt9nCKOdzmdXxfAHQU5bOJPxOkK1BAI1"


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
        timeout=10,
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
            # "filter[letter]": letter,
            "filter[country]": "eUpr0LBL/Zh4z9+wa32vcg==",
            "info[text]": "",
            "info[uid]": "NAMFcYaWWVtBVnKAEcKOQmFVeB8STmaGKexvj0Cv9r72FndhzeQpUPhyemDSJaKX+gAF2+f1VMCE7duPC7nacg==",
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


def main():
    for publisher in all_publishers():
        print(publisher)


if __name__ == "__main__":
    main()
