<template>
    <v-container>
        <v-row>
            <v-col cols="12">
        
                <v-text-field v-model="productName" label="이모티콘 이름"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="productPrice" label="이모티콘 가격"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-select
                v-model="productCategory"
                :items="categories"
                label="카테고리"
                clearable
                solo/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="content" label="이모티콘 상세 설명" auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="productTitleImage" label="이모티콘 대표 사진" perpend-icon="mdi-camera"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedTitleImageFilename">업로드된 파일: {{uploadedTitleImageFilename}}></p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="productContentImage" label="이모티콘 전체 사진" perpend-icon="mdi-camera"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedContentImageFilename">업로드된 파일: {{uploadedContentImageFilename}}></p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">등록</v-btn>
                <router-link :to="{ name: 'ProductListPage' }">
                    <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const productModule = 'productModule'
const accountModule = 'accountModule'
const authenticationModule = 'authenticationModule'

export default {
    data () {
        return {
            productName: '',
            productPrice: '',
            writer: '',
            productCategory: '',
            content: '',
            productTitleImage: null,
            productContentImage: null,
            uploadedTitleImageFilename: '',
            uploadedContentImageFilename: '',
            categories: ['귀여운','재밌는','다정한']
        }
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToDjango']),
        ...mapActions(accountModule, ['requestNicknameToDjango']),
        ...mapActions(authenticationModule, ['requestUserInfoToDjango']),
        async onSubmit () {
            console.log('작성 완료 버튼 누름')

            try {
                const userInfo = await this.requestUserInfoToDjango()
                const email = userInfo.kakao_account.email
                console.log('email:', email)
                const nickname = await this.requestNicknameToDjango(email)
                console.log('nickname:', nickname)

                if (this.productTitleImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('productName', this.productName)
                    imageFormData.append('productPrice', this.productPrice)
                    imageFormData.append('productCategory', this.productCategory)
                    imageFormData.append('writer', nickname)
                    imageFormData.append('content', this.content)
                    imageFormData.append('productTitleImage', this.productTitleImage)
                    imageFormData.append('productContentImage', this.productContentImage)

                    const response = await this.requestCreateProductToDjango(imageFormData)
                    this.uploadedFilename = response.data.imageName
                    this.$router.push({ name: 'ProductListPage'})
                } else {
                    console.log('이미지 파일을 선택하세요!')
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }
        },
        async onCancel () {
            console.log('취소 버튼 누름')
            alert('상품 등록이 취소되었습니다.');
            this.$router.go(-1) 
        }
    }
}
</script>