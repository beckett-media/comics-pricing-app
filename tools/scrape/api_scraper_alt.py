#!/usr/bin/env python
# coding: utf-8
import httpx
import queue
import threading
import time
import concurrent.futures
from itertools import chain


def publishers(letter, page):
    r = httpx.post(
        "https://comicspriceguide.com/Publisher/publishersReturn",
        timeout=None,
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

    try:
        data = r.json()

    except:
        print("failed to decode", r.text)
        raise

    return {
        "items": [
            {"name": item["nameSEO"], "id": item["id"], "type": ("Parent" if item["ImprintOf"] == None else item["ImprintOf"]['name'])} for item in data["items"] or []
        ],
        "pages": data["pages"],
    }


def titles(publisher, letter, page):
    name, pid = publisher["name"], publisher["id"]

    r = httpx.post(
        "https://comicspriceguide.com/Publisher/TitlesReturn",
        timeout=None,
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

    try:
        data = r.json()
    except:
        print("failed to decode", r.text)
        raise

    return {
        "items": [item["nameSEO"] for item in data["items"] or []],
        "pages": data["pages"],
    }


def worker_publisher(letter):
    page = 1
    data = publishers(letter, page)
    num_pages = data["pages"]
    items = [(letter, page, item) for item in data["items"]]
    while page <= num_pages:
        page += 1
        data = publishers(letter, page)
        items.extend((letter, page, item) for item in data["items"])
    return items


def run_publisher_threads(threads=28):
    letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ@"
    t0 = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        Q = list(chain(*list(executor.map(worker_publisher, list(letters)))))
    t1 = time.time()
    print(f"Ran all threads in {t1-t0:.1f} seconds")
    return Q


def worker_title(item):
    letter, page, data = item
    return titles(data, letter, page)


def run_title_threads(items, threads=50):
    t0 = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        Q = list(executor.map(worker_title, items))
    t1 = time.time()
    print(f"Ran all threads in {t1-t0:.1f} seconds")
    return Q


item_publishers = run_publisher_threads()
print(f"Publisher Count: {len(item_publishers)}")
item_publishers[0]


item_titles = run_title_threads(item_publishers)
print(f"Title Count: {len(item_titles)}")
item_titles[0]

