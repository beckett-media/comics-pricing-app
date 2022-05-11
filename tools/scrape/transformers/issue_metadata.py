def issues():
    with open("data/upload-cache/issues_dict.txt") as issues_file:
        return eval(issues_file.read())


def main():
    # with open("data/upload-cache/issues_metadata_dict.txt", "w") as issues_file:
    #     images_dict = {uid: issue["alternate"] for uid, issue in issues().items()}
    #     issues_file.write(str(images_dict))

    for (uid, issue) in issues().items():
        month = issue["date"]["month"] or None
        year = issue["date"]["year"]
        year = int(year) if year else None


if __name__ == "__main__":
    main()
