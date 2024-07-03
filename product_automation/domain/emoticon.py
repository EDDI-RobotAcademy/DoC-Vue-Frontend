from dataclasses import dataclass

@dataclass
class Emoticon:
    title: str
    title_image_url: str
    content_image_selector: str
    category: str
    index: int