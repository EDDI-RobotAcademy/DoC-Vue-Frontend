<template>
  <v-app-bar color="#0D003A" app dark height="50">
    <v-container class="d-flex justify-center align-center">
      <v-btn text @click="goToHome" class="btn-text large-button">
        <v-icon left>mdi-emoticon </v-icon>
        <span>
          <span class="blue-text">I'm</span>
          <span class="yellow-text"> Choonsik</span>
        </span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="goToProductList" class="btn-text">
        <!-- <v-icon left>mdi-store</v-icon> -->
        <span>Emoticon</span>
      </v-btn>
      <v-btn text @click="goToBoardList" class="btn-text">
        <!-- <v-icon left>mdi-forum</v-icon> -->
        <span>Communication</span>
      </v-btn>
      <v-btn text @click="goToReviewList" class="btn-text">
        <!-- <v-icon left>mdi-forum</v-icon> -->
        <span>Review</span>
      </v-btn>
      <v-btn text @click="goToCartList" class="btn-text">
        <!-- <v-icon left>mdi-forum</v-icon> -->
        <span>Cart</span>
      </v-btn>
      <v-btn v-if="!isAuthenticated" text @click="signIn" class="btn-text">
        <v-icon right>mdi-login</v-icon>
        <span>LogIn</span>
      </v-btn>
      <v-btn v-if="isAuthenticated" text @click="signOut" class="btn-text">
        <v-icon right>mdi-logout</v-icon>
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
      goToCartList () {
        router.push('/cart/list')
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
        // this.socket.close();
    }
}
</script>
<style scoped>


.v-btn--text .v-icon {
  margin-left: 0 !important;
}

.large-button .v-icon,
.large-button span {
  font-size: 23px;
  font-weight: bold;
  font-family: "Jua", sans-serif; /* 글씨체 설정 */
}
.blue-text {
  color: #c0e0ff;
}

.yellow-text {
  color: #ffd257;
}
</style>