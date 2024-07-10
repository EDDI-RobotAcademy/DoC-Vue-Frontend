<template>
    <v-container>
        <h2 class="title">리뷰 작성 페이지</h2>
        <v-row>
            <v-col cols="12">
                <p class="subtitle">제목</p>
                <v-text-field v-model="reviewTitle" required/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p class="rating">별점</p>
                <v-rating v-model="reviewRating" length="5" half-increments hover clearable color="#FC4C4E"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p class="context">내용</p>
                <v-textarea v-model="reviewContent" required auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="reviewImage" label="이미지" prepend-icon="mdi-camera"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedFileName">업로드된 파일: {{ uploadedFileName }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">
                    <v-icon>mdi-check</v-icon>
                    <span>작성 완료</span>
                </v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">
                    <v-icon>mdi-cancel</v-icon>
                    <span>취소</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const reviewModule = 'reviewModule'
const accountModule = 'accountModule'

export default {
    props: {
        productId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            reviewTitle: '',
            reviewRating: 0,
            reviewWriter: '',
            reviewContent: '',
            reviewImage: null,
            uploadedFileName: '',
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestNicknameToDjango']),
        ...mapActions(reviewModule, ['requestCreateReviewToDjango']),
        async onSubmit () {
            try {
                const nickname = await this.requestNicknameToDjango()
                console.log('nickname:', nickname)
        
                if (this.reviewTitle) {
                    const imageFormData = new FormData()
                    imageFormData.append('reviewTitle', this.reviewTitle)
                    imageFormData.append('reviewWriter', nickname)
                    imageFormData.append('reviewRating', this.reviewRating)  
                    imageFormData.append('reviewContent', this.reviewContent)
                    if (this.reviewImage) {
                        imageFormData.append('reviewImage', this.reviewImage)
                    }
                    
                    const response = await this.requestCreateReviewToDjango({
                    productId: this.productId,
                    imageFormData
                    })
                    
                    if (this.reviewImage) {
                        this.uploadedFileName = response.data.imageName
                    }
                    
                    await this.$router.push({
                        name: 'ReviewReadPage',
                        params: { reviewId: response.data.reviewId.toString() }
                    })

                    window.location.reload(true)
                } else {
                    console.log('제목을 입력해 주세요')
                }
                
                console.log('등록 완료')
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
        },
        onCancel () {
            console.log('등록 취소')
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.title {
    text-align: center;
}
.subtitle {
    text-align: start;
}
.context {
    text-align: start;
}
</style>