import os
import subprocess
from multiprocessing import Pool

from tqdm import tqdm


def image_url(url):
    if url == "/img/spacer.gif":
        return None
    elif url.startswith("/"):
        return f"https://comicspriceguide.com{url}"
    else:
        return url


def download(url, path):
    if url and not os.path.isfile(path):
        try:
            subprocess.run(
                f"curl {url} > {path}",
                shell=True,
                capture_output=True,
                check=True,
            )
        except subprocess.CalledProcessError as e:
            print("STATUS:", e.returncode)
            print("STDOUT:", e.stdout)
            print("STDERR:", e.stderr)
            raise


def publishers():
    with open("data/upload-cache/publishers_dict.txt") as publishers_file:
        return eval(publishers_file.read())


def titles():
    with open("data/upload-cache/titles_dict.txt") as titles_file:
        return eval(titles_file.read())


def issues():
    with open("data/upload-cache/issues_dict.txt") as issues_file:
        return eval(issues_file.read())


def process_publisher(item):
    uid, publisher = item
    download(image_url(publisher["logo"]), f"data/images/publishers/{uid}")


def download_publishers():
    ps = publishers()
    with Pool(50) as pool:
        with tqdm(total=len(ps)) as progress_bar:
            for _ in pool.imap_unordered(process_publisher, ps.items()):
                progress_bar.update()


def process_title(item):
    uid, title = item
    download(image_url(title["cover"]), f"data/images/titles/{uid}")


def download_titles():
    ts = titles()
    with Pool(50) as pool:
        with tqdm(total=len(ts)) as progress_bar:
            for _ in pool.imap_unordered(process_title, ts.items()):
                progress_bar.update()


def process_issue(item):
    uid, issue = item
    download(image_url(issue["cover"]), f"data/images/issues/{uid}")


def download_issues():
    ns = issues()
    with Pool(50) as pool:
        with tqdm(total=len(ns)) as progress_bar:
            for _ in pool.imap_unordered(process_issue, ns.items()):
                progress_bar.update()


def main():
    print("downloading publishers")
    download_publishers()
    print("downloading titles")
    download_titles()
    print("downloading issues")
    download_issues()


if __name__ == "__main__":
    main()
