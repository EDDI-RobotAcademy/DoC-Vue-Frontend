import { createStore } from 'vuex'
import boardModule from "@/board/store/boardModule"
import productModule from '@/product/store/productModule'
import authenticationModule from '@/authentication/store/authenticationModule'
import accountModule from '@/account/store/accountModule'
import cartModule from '@/cart/store/cartModule'
import reportModule from '@/report/store/reportModule'
import reviewModule from '@/review/store/reviewModule'
import orderModule from '@/order/store/orderModule'
import notificationModule from '@/notification/store/notificationModule'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardModule,
    productModule,
    authenticationModule,
    accountModule,
    cartModule,
    reportModule,
    reviewModule,
    orderModule,
    notificationModule,
  }
})
