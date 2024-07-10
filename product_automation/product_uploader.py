from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time

class ProductUploader:
    def __init__(self, url, img_path):
        self.url = url
        self.img_path = os.path.abspath(img_path)  # 절대 경로로 변환

        # 디버깅 모드의 크롬에 연결
        options = webdriver.ChromeOptions()
        options.debugger_address = "localhost:9222"
        self.driver = webdriver.Chrome(options=options)

    def get_image_pairs(self):
        image_pairs = []
        categories = ['cute', 'fun', 'message']
        
        for category in categories:
            category_path = os.path.join(self.img_path, category)
            images = sorted(os.listdir(category_path), key=lambda x: int(x.split('_')[1]))
            
            pairs = {}
            for img in images:
                parts = os.path.basename(img).split('_')
                auto_increment = parts[1]
                if auto_increment not in pairs:
                    pairs[auto_increment] = {}
                if 'content' in img:
                    pairs[auto_increment]['content'] = os.path.join(category_path, img)
                elif 'title' in img:
                    pairs[auto_increment]['title'] = os.path.join(category_path, img)
            
            for auto_increment, imgs in pairs.items():
                if 'content' in imgs and 'title' in imgs:
                    image_pairs.append((category, auto_increment, imgs['content'], imgs['title']))
        
        return image_pairs

    def upload(self):
        image_pairs = self.get_image_pairs()
        
        for category, auto_increment, content_path, title_path in image_pairs:
            self.driver.get(self.url)
            
            emoji_name = os.path.basename(content_path).split('_')[2]
            emoji_name = emoji_name.replace('!', '')  # 이모티콘 이름에서 느낌표 제거
            print(emoji_name)

            # 이모티콘 이름 입력
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-name"]')
            input_element = parent_element.find_element(By.CSS_SELECTOR, '.v-input__control input')
            input_element.send_keys(emoji_name)
            print(emoji_name)

            # 이모티콘 가격 입력
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-price"]')
            input_element = parent_element.find_element(By.CSS_SELECTOR, '.v-input__control input')
            input_element.send_keys('2000')
            print(emoji_name)

            
            # 카테고리 선택
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-category"]')
            parent_element.click()
            time.sleep(1)
            dropdown_item = self.driver.find_element(By.XPATH, f'//div[contains(text(), "{self.get_category_text(category)}")]')
            dropdown_item.click()
            print("성공")

            
            # 이모티콘 상세 설명 입력
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-description"]')
            input_element = parent_element.find_element(By.CSS_SELECTOR, '.v-input__control textarea')
            input_element.send_keys(f'{emoji_name}의 상세 설명')
            
            # title 이미지 업로드
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-title-image"]')
            input_element = parent_element.find_element(By.CSS_SELECTOR, 'input[type="file"]')
            input_element.send_keys(os.path.abspath(title_path))
            
            # content 이미지 업로드
            parent_element = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="input-product-content-image"]')
            input_element = parent_element.find_element(By.CSS_SELECTOR, 'input[type="file"]')
            input_element.send_keys(os.path.abspath(content_path))
            
            # 등록 버튼 클릭
            self.driver.find_element(By.CSS_SELECTOR, '[data-testid="btn-submit"]').click()

            time.sleep(1)
            # alert 처리
            WebDriverWait(self.driver, 10).until(EC.alert_is_present())
            alert = self.driver.switch_to.alert
            alert.accept()
            
            time.sleep(1)  # 각 등록 후 잠시 대기

            self.driver.get(self.url)

    def get_category_text(self, category):
        if category == 'cute':
            return '귀여운'
        elif category == 'fun':
            return '재밌는'
        elif category == 'message':
            return '메시지'
    
    def quit(self):
        self.driver.quit()

# def remove_exclamation_marks(directory):
#     for root, dirs, files in os.walk(directory):
#         for filename in files:
#             if '!' in filename:
#                 new_filename = filename.replace('!', '')
#                 old_filepath = os.path.join(root, filename)
#                 new_filepath = os.path.join(root, new_filename)
#                 os.rename(old_filepath, new_filepath)
#                 print(f'Renamed: {old_filepath} -> {new_filepath}')

# # 이미지 파일이 있는 디렉토리 경로를 설정
# img_directory = "product_img"


if __name__ == "__main__":
    # # 느낌표 제거 스크립트 실행
    # remove_exclamation_marks(img_directory)

    # 이미지 업로드 시작
    url = "http://localhost:8080/product/register"
    img_path = "product_img"
    product_uploader = ProductUploader(url, img_path)
    product_uploader.upload()
    product_uploader.quit()
