import subprocess


def image_url(url):
    if url == "/img/spacer.gif":
        return None
    elif url.startswith("/"):
        return f"https://comicspriceguide.com{url}"
    else:
        return url


def download(url, file):
    if url:
        subprocess.run(f"curl {url} > {file}", shell=True)


def publishers():
    publishers = []
    with open("data/clean/publishers.txt") as publishers_file:
        for line in publishers_file:
            publishers.append(eval(line.strip()))

    return publishers


def download_publishers():
    for publisher in publishers():
        download(
            image_url(publisher["logo"]), f"data/images/publishers/{publisher['id']}"
        )


def main():
    download_publishers()


if __name__ == "__main__":
    main()
