import OrderListPage from '@/order/pages/list/OrderListPage.vue'
import OrderReadPage from '@/order/pages/read/OrderReadPage.vue'

const OrderRoutes = [
    {
        path: '/order/list',
        name: 'OrderListPage',
        component: OrderListPage,
    },
    {
        path: '/order/read/:ordersId',
        name: 'OrderReadPage',
        components: {
            default: OrderReadPage,
        },
        props: {
            default: true
        }
    },
]

export default OrderRoutes