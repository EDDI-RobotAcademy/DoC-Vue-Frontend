import ReviewListPage from "@/review/pages/list/ReviewListPage.vue"
import ReviewRegisterPage from "@/review/pages/register/ReviewRegisterPage.vue"
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
]
export default ReviewRoutes