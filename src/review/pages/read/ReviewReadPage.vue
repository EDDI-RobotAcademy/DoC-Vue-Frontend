<template>
    <v-container>
        <v-card v-if="review">
            <v-card-title>
                <v-row align="center" no-gutters>
                    <!-- 대표 이미지 영역 -->
                    <v-col cols="6" v-if="review.reviewImage">
                        <v-img :src="getImageUrl(review.reviewImage)" aspect-ratio="3.5" class="grey lighten-2">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"/>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                    <!-- 제목, 작성자, 별점 영역 -->
                    <v-col cols="6">
                        <v-row>
                            <v-col class="title">{{ review.reviewTitle }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col class="writer">{{ review.reviewWriter }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-rating v-model="review.reviewRating" length="5" half-increments hover clearable readonly color="#FC4C4E"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="review.reviewContent" readonly label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto" v-if="isWriter">
                            <v-btn color="primary">
                                <router-link :to="{ name: 'ReviewModifyPage', params: { reviewId } }"
                                             class="router-link-no-underline">
                                    <v-icon>mdi-pencil</v-icon>
                                    <span>수정</span>
                                </router-link>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto" v-if="isWriterOrAdmin">
                            <v-btn color="error" @click="onDelete">
                                <v-icon>mdi-eraser</v-icon>
                                <span>삭제</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'ReviewListPage' }">
                                <v-btn color="#E3EF76">
                                    <v-icon>mdi-arrow-left</v-icon>
                                    <span>돌아가기</span>
                                </v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'
const accountModule = 'accountModule'

export default {
    props: {
        productId: {
            type: String,
            required: true
        },
        reviewId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            isWriter: false,
            isAdmin: false,
        }
    },
    computed: {
        ...mapState(reviewModule, ['review']),
        isWriterOrAdmin() {
            return this.isWriter || this.isAdmin;
        }
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewToDjango', 'requestDeleteReviewToDjango']),
        ...mapActions(accountModule, ['requestNicknameToDjango', 'requestRoleTypeToDjango']),
        async checkNickname() { 
            try {
                const nickname = await this.requestNicknameToDjango()
                console.log('nickname:', nickname)
                console.log('reviewWriter:', this.review.reviewWriter)
                console.log('nickname === this.review.reviewWriter:', nickname === this.review.reviewWriter)
                this.isWriter = (nickname === this.review.reviewWriter)
            } catch (error) {
                console.log('작성자 확인 중 에러 발생')
            }
        },
        async checkAdmin() {
            const roleType = await this.requestRoleTypeToDjango()
            this.isAdmin = (roleType === 'ADMIN')
        },
        async onDelete () {
            console.log('삭제를 누르셨습니다!')
            await this.requestDeleteReviewToDjango(this.reviewId)
            await this.$router.push({ name: 'ReviewListPage' })
        },
        getImageUrl (imageName) {
            if (imageName) {
                return require('@/assets/images/uploadImages/' + imageName)
            }
  
        },
    },
    async mounted () {
        console.log('reviewId:', this.reviewId)
        await this.requestReviewToDjango(this.reviewId)
        this.checkNickname()
        this.checkAdmin()
    },
}
</script>

<style scoped>
.router-link-no-underline {
    text-decoration-line: none;
    color: inherit;
}
.title {
    text-align: start;
    font-size: 25px;
}
.writer {
    text-align: start;
    font-size: 15px;
}
</style>