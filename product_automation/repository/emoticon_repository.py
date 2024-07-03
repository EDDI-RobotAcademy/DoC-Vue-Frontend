from domain.emoticon import Emoticon

class EmoticonRepository:
    def __init__(self):
        self.emoticons = []

    def add_emoticon(self, emoticon: Emoticon):
        self.emoticons.append(emoticon)

    def get_all_emoticons(self):
        return self.emoticons