export interface ReviewState {
    reviewList: Review[]
    review: Review | null
}

export interface Review {
    reviewId: number
    reviewTitle: string
    reviewWriter: string
    reviewContent: string
    reviewRating: number
    reviewRegDate: string
    reviewUpdDate: string
    productId: string
}

const state: ReviewState = {
    reviewList: [],
    review: null
}

export default state