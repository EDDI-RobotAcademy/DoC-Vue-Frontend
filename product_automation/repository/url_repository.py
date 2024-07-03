from domain.url import URL

class URLRepository:
    def __init__(self):
        self.urls = []

    def add_url(self, url: URL):
        self.urls.append(url)

    def get_all_urls(self):
        return self.urls
