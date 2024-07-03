from repository.emoticon_repository import EmoticonRepository
from service.crawler_service import CrawlerService


def main():
    emoticon_repository = EmoticonRepository()
    crawler_service = CrawlerService(emoticon_repository, download_folder="/product_img")

    categories = {
        "cute": "https://e.kakao.com/style/categories/1",
        "message": "https://e.kakao.com/style/categories/5",
        "fun": "https://e.kakao.com/style/categories/2"
    }

    for category, url in categories.items():
        crawler_service.crawl_category(category, url)

    crawler_service.quit_driver()


if __name__ == "__main__":
    main()