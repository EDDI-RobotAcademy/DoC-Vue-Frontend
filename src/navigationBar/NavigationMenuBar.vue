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
        <span>Emoticon</span>
      </v-btn>
      <v-btn text @click="goToBoardList" class="btn-text">
        <span>Communication</span>
      </v-btn>
      <v-btn text @click="goToReviewList" class="btn-text">
        <span>Review</span>
      </v-btn>
      <v-btn text @click="goToCartList" class="btn-text">
        <span>Cart</span>
      </v-btn>
      <v-btn text @click="goToOrderList" class="btn-text">
        <span>Order</span>
      </v-btn>
      <v-btn v-if="isAdmin" text @click="goToNotificationList" class="btn-text">
        <span>Notification</span>
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
const accountModule = 'accountModule'

export default {
  data () {
      return {
          isAdmin: false,
      }
  },
  computed: {
      ...mapState(authenticationModule, ['isAuthenticated'])
  },
  methods: {
      ...mapActions(authenticationModule, ['requestLogoutToDjango']),
      ...mapActions(accountModule, ['requestRoleTypeToDjango']),
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
      goToOrderList () {
        router.push('/order/list')
      },
      goToNotificationList () {
        router.push('/notification/list')
      },
      signIn () {
          router.push('/account/login')
      },
      signOut () {
          this.requestLogoutToDjango()
          router.push('/')
        },
  },
  async mounted () {
        console.log('navigation bar mounted()')

        const userToken = localStorage.getItem("userToken")

        if (userToken) {
            console.log('You already have a userToken!!!')
            this.$store.state.authenticationModule.isAuthenticated = true
        }

        const response = await this.requestRoleTypeToDjango()
        if (response === 'ADMIN') {
          this.isAdmin = true
        }
    },
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