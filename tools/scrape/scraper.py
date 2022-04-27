from time import sleep

from selenium import webdriver

driver = webdriver.Firefox()
driver.get("https://comicspriceguide.com/publishers")


def click(el):
    driver.execute_script("arguments[0].click();", el)
    sleep(2)


def publishers():
    section_ids = [
        id
        for el in driver.find_elements_by_tag_name("a")
        if (id := el.get_property("id")).startswith("hyp")
        and "disabled" not in el.get_attribute("class")
    ]

    for id in section_ids:
        click(driver.find_element_by_id(id))

        page = 1
        while True:
            # scrape publishers
            publishers = [
                el.get_property("href")
                for el in driver.find_elements_by_class_name("grid_publisher_title")
            ]

            print(f"scraped {id} pg. {page}: {len(publishers)} publishers")

            yield from publishers

            btn_next = driver.find_element_by_class_name("repeater-next")

            # if the next button is disabled there are no more publisher pages
            if btn_next.get_property("disabled"):
                break

            click(btn_next)
            page += 1


def main():
    with open("data/publishers.txt", "w") as out:
        for publisher in publishers():
            out.write(publisher + "\n")

    driver.close()


if __name__ == "__main__":
    main()
