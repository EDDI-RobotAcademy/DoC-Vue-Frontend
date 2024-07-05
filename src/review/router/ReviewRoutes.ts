import ReviewListPage from "@/review/pages/list/ReviewListPage.vue"
import ReviewRegisterPage from "@/review/pages/register/ReviewRegisterPage.vue"
import ReviewReadPage from "@/review/pages/read/ReviewReadPage.vue"
import ReviewModifyPage from "@/review/pages/modify/ReviewModifyPage.vue"
import ReviewProductListPage from "@/review/pages/productList/ReviewProductListPage.vue"

const ReviewRoutes = [
    {
        path: '/review/list',
        name: 'ReviewListPage',
        component: ReviewListPage,
    },
    {
        path: '/review/register/:productId',
        name: 'ReviewRegisterPage',
        components: {
            default: ReviewRegisterPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/review/read/:reviewId',
        name: 'ReviewReadPage',
        components: {
            default: ReviewReadPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/review/modify/:reviewId',
        name: 'ReviewModifyPage',
        components: {
            default: ReviewModifyPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/review/product/list/:productId',
        name: 'ReviewProductListPage',
        components: {
            default: ReviewProductListPage,
        },
        props: {
            default: true
        }
    },
]

export default ReviewRoutes