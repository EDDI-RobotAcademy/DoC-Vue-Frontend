<template>
  <v-app-bar color="#EDC393" app dark height="70">
    <v-container class="d-flex justify-end">
      <v-img :src="require('@/assets/images/fixed/doc_logo.png')" v-on:click="goToHome" height="50"></v-img>
        <v-spacer></v-spacer>
      <v-btn text @click="goToProductList" class="btn-text">
        <v-icon left>mdi-store</v-icon>
        <span>Emoticon</span>
      </v-btn>
      <v-btn text @click="goToBoardList" class="btn-text">
        <v-icon left>mdi-forum</v-icon>
        <span>Communication</span>
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
          isLogin: !!localStorage.getItem("userToken")
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
      signIn () {
          router.push('/account/login')
      },
      signOut () {
          this.requestLogoutToDjango()
          router.push('/')
        },
  },
  mounted () {
      window.addEventListener('storage', this.updateLoginStatus)
  },
  beforeUnmount () {
      window.removeEventListener('storage', this.updateLoginStatus)
  },
}
</script>