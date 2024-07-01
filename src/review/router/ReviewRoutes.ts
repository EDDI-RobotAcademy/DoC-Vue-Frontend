import ReviewListPage from "@/review/pages/list/ReviewListPage.vue"
import ReviewRegisterPage from "@/review/pages/register/ReviewRegisterPage.vue"
import ReviewReadPage from "@/review/pages/read/ReviewReadPage.vue"
import ReviewModifyPage from "@/review/pages/modify/ReviewModifyPage.vue"

const ReviewRoutes = [
    {
        path: '/review/list',
        name: 'ReviewListPage',
        component: ReviewListPage,
    },
    {
        path: '/review/register',
        name: 'ReviewRegisterPage',
        component: ReviewRegisterPage,
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
]

export default ReviewRoutes