<template>
  <div>
    <div class="background">
      <div class="stars"></div>
      <v-row justify="center" align="center" style="height: auto; position: relative;">
        <v-col cols="12">
          <div class="image-container">
            <v-img
              src="@/assets/images/fixed/brd_fix.png"
              height="auto"
              width="100%"
              contain
            ></v-img>
            <div class="text-overlay">
              <div class="text-content">
                <span class="main-text">나는 춘식이</span>
                <br><br>
                <span class="sub-text line">"나는 춘식이"는 당신만의 감정, 스타일 <br>그리고 세계관을 담아낼 수 있는 <br>퍼스널 이모티콘 발견의 기회를 제공합니다.</span>
                <br><br><br>
                <span class="sub-text line">비대면 소통이 증가함에 따라, <br>우리에게는 언어를 넘어서서 <br>감정과 생각을 전달할 수 있는 방법이 필요합니다.</span>
                <br><br><br><br>
                <span class="sub-text-2 line">언어를 넘어선 소통 방법, 이모티콘</span>   
                <br><br>
                <span class="sub-text line">유명 이모티콘 "춘식이"에서 영감을 받아 이모티콘이 되는 나,<br>"나는 춘식이"가 탄생했습니다.<br>당신이 자신을 파악할 수 있도록<br>다양한 이모티콘들을 모아두었습니다.</span>
                <br><br><br>
                <span class="sub-text line">성별, 연령, 혹은 취향에 맞는 다양한 선택지를 통해<br>당신이 원하는 이모티콘을 찾아보세요.<br>당신을 나타내는 그 하나의 작은 표현이 될 것입니다.</span>
                <br><br><br>
                <span class="sub-text-3 line">"나는 춘식이"는 <br> 단순히 이모티콘을 판매하는 곳, 그 이상입니다.</span>
                <br><br>
                <span class="sub-text line">온라인, 오프라인 그 어느 곳에서도 당신은 존재합니다.<br>지금 당신의 이모티콘을 찾아보세요!</span>
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
import { mapActions,mapState } from 'vuex'

const accountModule = 'accountModule'

export default defineComponent({
  computed: {
        ...mapState(accountModule, ['isAdmin'])
  },
  methods: {
    ...mapActions(accountModule, ['requestRoleTypeToDjango']),
    goToProductList () {
      router.push('/product/list')
    },
    async checkRoleType () {
      const response = await this.requestRoleTypeToDjango()
                if (response === 'ADMIN') {
                    console.log('response:', response)
                    // this.$store.state.accountModule.isAdmin = true
                    localStorage.setItem('isAdmin', 'true')
                }
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
    this.checkRoleType()
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
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  font-family: "Jua", sans-serif;
  z-index: 2;
}

.text-content {
  max-width: 800px;
  margin-top: -20vh; /* 반응형 여백 설정 */
  padding: 2vh; /* 텍스트 상단과의 여백 추가 */
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
  font-size: 4.5vw; /* 반응형 텍스트 크기 */
  font-weight: normal;
}

.sub-text {
  font-size: 1.8vw; /* 반응형 텍스트 크기 */
  font-weight: normal;
  letter-spacing: 0.2vw;
  line-height: 2.4em;
}

.sub-text-2 {
  font-size: 2.5vw; /* 반응형 텍스트 크기 */
  font-weight: normal
}

.sub-text-3 {
  font-size: 2.5vw; /* 반응형 텍스트 크기 */
  font-weight: normal;
  color: #ffe394;
}

.button-container {
  text-align: center;
}

.button-image {
  width: 15vw; /* 반응형 버튼 크기 */
  height: auto;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  z-index: 3;
  position: relative;
}

/* 추가적인 반응형 스타일을 위한 미디어 쿼리  for 작은 화면 */
@media (max-width: 1200px) {
  .text-content {
    margin-top: 2vh;
  }
}

@media (max-width: 768px) {
  .text-content {
    margin-top: 1vh;
  }
}

@media (max-width: 850px) {
  .text-content {
    margin-top: 0vh;
  }

  .main-text {
    font-size: 4vw; /* 반응형 텍스트 크기 */
  }

  .sub-text {
    font-size: 2vw; /* 반응형 텍스트 크기 */
    line-height: 0em
  }

  .sub-text-2 {
    font-size: 3vw; /* 반응형 텍스트 크기 */
    line-height: 0em
  }

  .sub-text-3 {
    font-size: 2.5vw; /* 반응형 텍스트 크기 */
    line-height: 0em
  }

  .button-image {
    width: 15vw; /* 반응형 버튼 크기 */
  }
}
</style>
