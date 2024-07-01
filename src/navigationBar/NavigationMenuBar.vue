<template>
  <v-app-bar color="black" app dark height="60">
    <v-container class="d-flex justify-center align-center" v-on::click='goToHome'>
      <v-icon left>mdi-forum</v-icon>
        <span>I'm Choonsik</span>
        <!-- <v-img src="@/assets/images/fixed/logo.png" v-on::click='goToHome' height="50" class="mr-2"></v-img> -->
      <v-spacer></v-spacer>
      <v-btn text @click="goToProductList" class="btn-text">
        <v-icon left>mdi-store</v-icon>
        <span>Emoticon</span>
      </v-btn>
      <v-btn text @click="goToBoardList" class="btn-text">
        <v-icon left>mdi-forum</v-icon>
        <span>Communication</span>
      </v-btn>
      <v-btn text @click="goToReviewList" class="btn-text">
        <v-icon left>mdi-forum</v-icon>
        <span>Review</span>
      </v-btn>
      <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
        <v-icon left>mdi-login</v-icon>
        <span>LogIn</span>
      </v-btn>
      <v-btn v-if="isAuthenticated" text @click="signOut" class="btn-text">
        <v-icon left>mdi-logout</v-icon>
        <span>LogOut</span>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
import { mapActions,mapState } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
  data () {
      return {
          isLogin: !!localStorage.getItem("userToken"),
      }
  },
  computed: {
      ...mapState(authenticationModule, ['isAuthenticated'])
  },
  methods: {
      ...mapActions(authenticationModule, ['requestLogoutToDjango']),
      goToHome () {
          router.push('/')
      },
      goToProductList () {
          router.push('/product/list')
      },
      goToBoardList () {
          router.push('/board/list')
      },
      goToReviewList () {
          router.push('/review/list')
      },
      signIn () {
          router.push('/account/login')
      },
      signOut () {
          this.requestLogoutToDjango()
          router.push('/')
        },
  },
  mounted () {
        console.log('navigation bar mounted()')

        const userToken = localStorage.getItem("userToken")

        if (userToken) {
            console.log('You already have a userToken!!!')
            this.$store.state.authenticationModule.isAuthenticated = true
        }
    },
    beforeUnmount() {
        // WebSocket 연결 해제
        this.socket.close();
    }
}
</script>