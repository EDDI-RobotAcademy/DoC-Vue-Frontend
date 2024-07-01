<template>
  <div>
    <div class="background">
      <div class="stars"></div>
      <v-row justify="center" align="center" style="height: auto; position: relative;">
        <v-col cols="12">
          <!-- 이미지 컨테이너 추가 -->
          <div class="image-container">
            <v-img
              src="@/assets/images/fixed/brd.png"
              height="auto"
              width="120%"
              contain  
            ></v-img>
            <!-- 이미지 아래에 텍스트를 추가 -->
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
                <!-- 버튼 추가 -->
                <br><br><br>
                <div class="button-container">
                  <v-img src="@/assets/images/fixed/button.png" alt="Button" class="button-image" @click="goToProductList"/>
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

export default defineComponent({
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
  },
  methods: {
    goToProductList() {
      // this.$router.push({ name: 'ProductListPage' });
      console.log('버튼 누름');
    }
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Jua&display=swap');

.background {
  position: relative; /* 자식 요소의 위치를 상대적으로 설정 */
  background-color: #fff; /* 배경 이미지가 로딩되기 전에 보일 색상 */
  overflow: hidden; /* 자식 요소들이 배경을 벗어나지 않도록 함 */
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
  position: relative; /* 이미지 컨테이너를 상대 위치로 설정 */
  width: 100%; /* 이미지 컨테이너의 너비 설정 */
  height: auto; /* 이미지 컨테이너의 높이를 자동으로 설정 */
}

.text-overlay {
  position: absolute; /* 절대 위치로 설정하여 이미지 위에 겹쳐질 수 있도록 함 */
  top: 0; /* 이미지 상단에 위치 */
  left: 0; /* 이미지 왼쪽에 위치 */
  width: 100%; /* 오버레이가 이미지의 전체 너비를 차지하도록 설정 */
  height: 100%; /* 오버레이가 이미지의 전체 높이를 차지하도록 설정 */
  display: flex; /* 텍스트를 가운데 정렬하기 위해 flexbox 사용 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  text-align: center; /* 텍스트를 가운데 정렬 */
  color: white; /* 텍스트 색상 */
  font-size: 24px; /* 메인 텍스트 크기 */
  font-weight: bold; /* 메인 텍스트 굵기 */
  line-height: 1.5; /* 줄간격 설정 */
  padding: 20px; /* 텍스트 오버레이의 내부 여백 */
  background: rgba(0, 0, 0, 0.5); /* 배경 색상을 반투명 검정색으로 설정 */
  font-family: "Jua", sans-serif; /* 글씨체 설정 */
}

.text-content {
  max-width: 800px; /* 텍스트 컨텐츠의 최대 너비 설정 */
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
  font-size: 60px; /* 메인 텍스트 크기 */
  font-weight: bold; /* 메인 텍스트 굵기 */
}

.sub-text {
  font-size: 25px; /* 서브 텍스트 크기 */
  font-weight: normal; /* 서브 텍스트 굵기 */
  letter-spacing: 2px; /* 자간 설정 */
  line-height: 60px; /* 줄 간격 추가 */
}

.sub-text-2 {
  font-size: 40px; /* 서브 텍스트 크기 */
  font-weight: bold; /* 서브 텍스트 굵기 */
}

.button-container {
  text-align: center; /* 버튼을 가운데 정렬 */
}

.button-image {
  width: 500px; /* 버튼 이미지의 너비 */
  height: auto; /* 비율을 유지한 채 높이를 자동으로 조정 */
  cursor: pointer; /* 버튼에 마우스를 올렸을 때 포인터로 변경 */
  display: block; /* 블록 요소로 설정하여 가운데 정렬 가능하게 함 */
  margin: 0 auto; /* 가운데 정렬을 위해 마진 설정 */
}
</style>
