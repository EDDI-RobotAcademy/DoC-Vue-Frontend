<template>
    <div class="background">
        <div class="stars"></div>
        <v-container class="overlay">
            <v-row class="justify-center">
                <v-col class="d-flex flex-column align-center white-background rounded-box" cols="12" md="4">
                    <v-row class="content-center no-gutter">
                        <v-col class="d-flex align-center justify-center" cols="12" style="margin-bottom: 0px">
                            <div class="text-center sub-text-2">
                                <p>회원가입 및 로그인을 위해서</p>
                                <p>아래 버튼을 클릭해주세요</p>
                                <v-img class="mx-auto icons" height="70" style="margin-top: 30px;"
                                       :src="require('@/assets/images/fixed/kakao_login.png')"
                                       aspect-ratio="1" @click="goToKakaoLogin"/>
                            </div>
                        </v-col>
                        <v-col class="d-flex align-center justify-center" cols="12" style="margin-top: 0px;">
                            <div class="text-center sub-text-2">
                                <p>비로그인으로 진행하시려면</p>
                                <p>홈으로 이동하는 아래 버튼을 눌러주세요</p>
                                <p>단, 기능에 제한이 있습니다.</p>
                                <v-img class="mx-auto icons" height="70" style="margin-top: 30px;"
                                       :src="require('@/assets/images/fixed/goto_home.png')"
                                       aspect-ratio="1" @click="goToHome"/>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import router from '@/router'

const authenticationModule = 'authenticationModule'

export default {
    setup () {
        const store = useStore()

        const goToKakaoLogin = async () => {
            await store.dispatch("authenticationModule/requestKakaoOauthRedirectionToDjango")
        }

        return {
            goToKakaoLogin
        }
    },
    methods: {
        goToHome () {
          router.push('/')
        }
    }
}
</script>

<style scoped>
.background {
  position: relative;
  background: url('@/assets/images/fixed/login_bg.png') no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
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

.white-background {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 80%; /* 가로 크기를 줄이기 위해 추가 */
  max-width: 400px; /* 최대 가로 크기 */
  height: 700px;
}

.rounded-box {
  border-radius: 15px;
}

.content-center {
    justify-content: center;
    margin-top: 20px;
}

.no-gutter > .v-col {
    padding: 0 !important;
}

.icons {
    cursor: pointer;
}

.text-center {
    text-align: center;
}

.align-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.sub-text-2 {
    font-size: 22px;
    font-weight: bold;
    color: black;
    font-family: "Jua", sans-serif; /* 글씨체 설정 */
}
</style>
