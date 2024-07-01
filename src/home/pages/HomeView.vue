<template>
  <div>
    <div class="background">
      <div class="stars"></div>
      <v-row justify="center" align="center" style="height: auto; position: relative;">
        <v-col cols="12">
          <div class="image-container">
            <v-img
              src="@/assets/images/fixed/brd.png"
              height="auto"
              width="120%"
              contain  
            ></v-img>
            <div class="text-overlay">
              <div class="text-content">
                <span class="main-text">나는 춘식이</span>
                <br><br><br><br><br>
                <span class="sub-text line">"나는 춘식이"는 당신만의 감정, 스타일 <br>그리고 세계관을 담아낼 수 있는 <br>퍼스널 이모티콘 발견의 기회를 제공합니다.</span>
                <br><br><br><br><br>
                <span class="sub-text line">비대면 소통이 증가함에 따라 <br>우리에게는 언어를 넘어서서 <br>감정과 생각을 전달할 수 있는 방법이 필요합니다.</span>
                <br><br><br><br><br><br>
                <span class="sub-text-2 line">이모티콘은<br>언어를 넘어선 소통 방법입니다</span>   
                <br><br><br><br>
                <span class="sub-text line">유명 이모티콘 "춘식이"에서 영감을 받아 이모티콘이 되는 나<br>"나는 춘식이"가 탄생했습니다.<br>당신이 자신을 파악할 수 있도록<br>다양한 이모티콘들을 모아두었습니다.</span>
                <br><br><br>
                <span class="sub-text line">성별, 연령, 혹은 취향에 맞는 다양한 선택지를 통해<br>당신이 원하는 이모티콘을 찾아보세요.<br>당신을 나타내는 그 하나의 작은 표현이 될 것입니다.</span>
                <br><br><br>
                <span class="sub-text line">"나는 춘식이"는 단순히 이모티콘을 판매하는 곳 이상입니다.<br>당신의 정체성과 감정을 자유롭게 표현하세요.<br>온라인, 오프라인 그 어느 곳에서도 당신은 존재합니다.<br>지금 당신의 이모티콘을 찾아보세요!</span>
                <br><br><br>
                <div class="button-container">
                  <v-img @click="goToProductList" src="@/assets/images/fixed/goto_shop.png" alt="Button" class="button-image"/>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  methods: {
    goToProductList () {
      router.push('/product/list')
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
      observer.observe(line);
    });
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Jua&display=swap');

.background {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}

.stars {
  width: 200%;
  height: 200%;
  background: url('https://www.transparenttextures.com/patterns/stardust.png');
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: 1;
  animation: twinkling 60s infinite;
}

@keyframes twinkling {
  0% { background-position: 0 0; }
  100% { background-position: -10000px 5000px; }
}

.image-container {
  position: relative;
  width: 100%;
  height: auto;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Jua", sans-serif;
  z-index: 2;
}

.text-content {
  max-width: 800px;
}

.line {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 3.0s ease-out, transform 3.0s ease-out;
}

.line.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-text {
  font-size: 60px;
  font-weight: bold;
}

.sub-text {
  font-size: 25px;
  font-weight: normal;
  letter-spacing: 2px;
  line-height: 60px;
}

.sub-text-2 {
  font-size: 40px;
  font-weight: bold;
}

.button-container {
  text-align: center;
}

.button-image {
  width: 500px;
  height: auto;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  z-index: 3; /* 추가 */
  position: relative; /* 추가 */
}
</style>
