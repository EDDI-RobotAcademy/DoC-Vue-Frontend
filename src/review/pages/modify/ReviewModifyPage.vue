<template>
    <v-container>
        <v-card v-if="review">
            <v-card-title>게시물 수정</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="reviewTitle" label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="review.reviewWriter" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="reviewContent" label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-rating v-model="reviewRating" length="5" half-increments hover clearable color="#FC4C4E"/>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="primary" @click="onModify">
                                <v-icon>mdi-check</v-icon>
                                <span>수정 완료</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'ReviewReadPage', params: { reviewId } }">
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

export default {
    props: {
        reviewId: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            reviewTitle: '',
            reviewWriter: '',
            reviewContent: '',
            reviewRating: 0
        }
    },
    computed: {
        ...mapState(reviewModule, ['review'])
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewToDjango', 'requestModifyReviewToDjango']),
        async onModify () {
            try {
                const payload = {
                    reviewTitle: this.reviewTitle,
                    reviewContent: this.reviewContent,
                    reviewRating: this.reviewRating,
                    reviewId: this.reviewId,
                }

                await this.requestModifyReviewToDjango(payload)
                await this.$router.push({ 
                    name: 'ReviewReadPage',
                    params: { reviewId: this.reviewId } 
                })
            } catch (error) {
                console.error('수정 중 에러 발생:', error)
            }
        }
    },
    created () {
        this.requestReviewToDjango(this.reviewId).then(() => {
            this.reviewTitle = this.review.reviewTitle
            this.reviewWriter = this.review.reviewWriter
            this.reviewContent = this.review.reviewContent
            this.reviewRating = this.review.reviewRating
        })
    },
}
</script>
