<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12" lg="11">
                <h2 class="title">
                    <span>리뷰</span>
                    <v-icon class="ml-auto">mdi-star-face</v-icon>
                </h2>
                <v-row v-if="reviewList.length === 0" type="info">
                    <strong>해당 상품에 등록된 리뷰가 없습니다.</strong>
                </v-row>
                <v-row class="item-container">
                    <v-col v-for="item in pagedItems" :key="item.reviewId" cols="12" sm="6" md="4" lg="3" @click="readRow(item)" class="text-center mb-3">
                        <v-card class="pa-3 review-card">
                            <div v-if="item.reviewImage" class="image-container">
                                <v-img :src="getImageUrl(item.reviewImage)" alt="reviewImage" aspect-ratio="3.5" class="review-image"></v-img>
                                <div>{{ item.reviewTitle }}</div>
                                <div>{{ item.reviewWriter }}</div>
                                <div>
                                    <v-rating v-model="item.reviewRating" half-increments hover clearable dense readonly color="#FC4C4E" class="custom-rating"></v-rating>
                                </div>
                                <div>{{ formatDate(item.reviewRegDate) }}</div>
                            </div>
                            <div v-else class="no-image-container">
                                <div>{{ item.reviewTitle }}</div>
                                <div>{{ item.reviewWriter }}</div>
                                <div>
                                    <v-rating v-model="item.reviewRating" half-increments hover clearable dense readonly color="#FC4C4E" class="custom-rating"></v-rating>
                                </div>
                                <div>{{ formatDate(item.reviewRegDate) }}</div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <br>
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(reviewList.length / perPage)"
                    color="primary"
                    @input="updateItems"/>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="auto">
                <v-btn color="#E3EF76" @click="goToLastPage">
                    <v-icon left>mdi-arrow-left</v-icon>
                    <span>돌아가기</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    props: {
        productId: {
            type: String,
            required: true
        },
    },
    computed: {
        ...mapState(reviewModule, ['reviewList']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.reviewList.slice(startIdx, endIdx).map(item => ({
                ...item,
                reviewRegDate: this.formatDate(item.reviewRegDate)
            }))
        }
    },
    mounted() {
        this.requestReviewProductListToDjango(this.productId)
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewProductListToDjango']),
        readRow(item) {
            this.$router.push({
                name: 'ReviewReadPage',
                params: { reviewId: item.reviewId.toString() }
            })
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            const date = new Date(dateString)
            return date.toLocaleDateString('ko-KR', options)
        },
        getImageUrl(imageName) {
            if (imageName) {
                return require('@/assets/images/uploadImages/' + imageName)
            } // 기본 이미지 경로
        },
        goToLastPage() {
            this.$router.go(-1)
        }
    },
    data() {
        return {
            perPage: 8, // 고정된 항목 수
            pagination: { page: 1 }
        }
    }
}
</script>

<style>
.mb-review {
    margin-top: 2rem; /* 원하는 공백 크기로 조정 */
    background-color: #FEFEFE;
}
.title {
    text-align: center;
    margin-bottom: 3rem;
}
.text-right {
    text-align: center; /* 이 부분을 중앙 정렬로 변경 */
}
/* 별 간격을 조정하는 스타일 */
.custom-rating .v-rating__item {
    margin-left: -12.5px;
    margin-right: -12.5px; /* 별 간격을 줄이는 값 */
}
.text-center {
    text-align: center; /* 모든 데이터를 가운데 정렬 */
}
.item-container {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
}
.review-card {
    height: 100%; /* 카드 높이를 고정 */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 콘텐츠를 카드 높이에 맞게 분배 */
}
.image-container {
    text-align: center;
    margin-bottom: 1rem;
}
.review-image {
    max-width: 100%;
    height: auto;
}
.no-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
