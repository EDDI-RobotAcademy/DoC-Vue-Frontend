import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from PIL import Image
from domain.emoticon import Emoticon
from repository.emoticon_repository import EmoticonRepository


class CrawlerService:
    def __init__(self, emoticon_repository: EmoticonRepository, download_folder: str = "/product_img"):
        self.emoticon_repository = emoticon_repository
        self.download_folder = download_folder
        os.makedirs(self.download_folder, exist_ok=True)
        self.driver = self.setup_driver()

    def setup_driver(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
        return driver

    def get_emoticon_links(self, category_url):
        self.driver.get(category_url)
        time.sleep(2)
        links = [elem.get_attribute('href') for elem in self.driver.find_elements(By.CLASS_NAME, 'link_product')]
        print(links)
        return links

    def capture_element_screenshot(self, element, output_path):
        location = element.location
        size = element.size
        self.driver.save_screenshot("full_screenshot.png")
        full_screenshot = Image.open("full_screenshot.png")
        left = location['x']
        top = location['y']
        right = left + size['width']
        bottom = top + size['height']
        element_screenshot = full_screenshot.crop((left, top, right, bottom))
        element_screenshot.save(output_path)
        os.remove("full_screenshot.png")

    def process_emoticon_page(self, emoticon: Emoticon):
        url = f"https://e.kakao.com{emoticon.content_image_selector}"
        self.driver.get(url)
        time.sleep(2)

        # 이모티콘 제목에서 !와 ? 제거
        sanitized_title = emoticon.title.replace('!', '').replace('?', '')

        # 다운로드 타이틀 이미지
        img_data = requests.get(emoticon.title_image_url).content
        title_img_path = f"{self.download_folder}/{emoticon.category}_{emoticon.index}_{sanitized_title}_title.png"
        with open(title_img_path, 'wb') as handler:
            handler.write(img_data)

        # 콘텐츠 이미지 캡처
        content_element = self.driver.find_element(By.CLASS_NAME, 'list_emoticon')
        content_img_path = f"{self.download_folder}/{emoticon.category}_{emoticon.index}_{sanitized_title}_content.png"
        self.capture_element_screenshot(content_element, content_img_path)

    def crawl_category(self, category, category_url):
        links = self.get_emoticon_links(category_url)
        for index, link in enumerate(links, start=1):
            emoticon_url = link
            self.driver.get(emoticon_url)
            time.sleep(2)

            title = self.driver.find_element(By.CLASS_NAME, 'tit_inner').text
            title_image_url = self.driver.find_element(By.CLASS_NAME, 'thumb_img').get_attribute('src')
            content_image_selector = link

            emoticon = Emoticon(
                title=title,
                title_image_url=title_image_url,
                content_image_selector=content_image_selector,
                category=category,
                index=index
            )
            self.emoticon_repository.add_emoticon(emoticon)
            self.process_emoticon_page(emoticon)

            if index >= 33:
                break

    def quit_driver(self):
        self.driver.quit()
