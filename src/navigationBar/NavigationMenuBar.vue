<template>
    <v-app-bar color="orange" app dark height="50">
      <v-container class="d-flex justify-center align-center">
        <v-btn @click="goToHome" class="mx-auto">
          <v-toolbar-title class="text-uppercase text--darken-4">
            <span>이모티콘 project</span>
          </v-toolbar-title>
        </v-btn>
      </v-container>
    </v-app-bar>
  
    <v-app-bar color="primary" app dark height="50">
      <v-container class="d-flex justify-end">
        <v-btn text @click="goToProductList" class="btn-text">
          <v-icon left>mdi-store</v-icon>
          <span>상품</span>
        </v-btn>
        <v-btn text @click="goToBoardList" class="btn-text">
          <v-icon left>mdi-forum</v-icon>
          <span>게시판</span>
        </v-btn>
        <v-btn v-if="!isLogin" text @click="signIn" class="btn-text">
          <v-icon left>mdi-login</v-icon>
          <span>로그인</span>
        </v-btn>
        <v-btn v-if="isLogin" text @click="signOut" class="btn-text">
          <v-icon left>mdi-logout</v-icon>
          <span>로그아웃</span>
        </v-btn>
      </v-container>
    </v-app-bar>
  </template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'

export default {
    data () {
        return {
            navigation_drawer: false,
            // links: [{ icon: 'mdi-home', action: this.goToHome, route: '/' }],
            accessToken: null,
            isLogin: false,
            // items: [
            //     { title: 'Product', action: this.goToProductList() },
            //     { title: 'Board', action: this.goToBoardList() },
            // ]
        }
    },
    methods: {
        goToHome () {
            router.push('/')
        },
        goToProductList () {
            router.push('/product/list')
        },
        goToBoardList () {
            router.push('/board/list')
        },
        signIn () {
            router.push('/account/login')
        },
        signOut () {
            localStorage.removeItem("accessToken")
            this.isLogin = false
            router.push('/')
          },
        updateLoginStatus () {
            this.userToken = localStorage.getItem("userToken")
            this.isLogin = !!this.userToken
        }
    },
    mounted () {
      this.updateLoginStatus()
        window.addEventListener('storage', this.updateLoginStatus)
    },
    beforeUnmount () {
        window.removeEventListener('storage', this.updateLoginStatus)
    },
}
</script>