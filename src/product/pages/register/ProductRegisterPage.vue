<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="productName" label="이모티콘 이름" data-testid="input-product-name"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="productPrice" label="이모티콘 가격" data-testid="input-product-price"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-select
                v-model="productCategory"
                :items="categories"
                label="카테고리"
                clearable
                solo
                data-testid="input-product-category"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="content" label="이모티콘 상세 설명" auto-grow data-testid="input-product-description"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="productTitleImage" label="이모티콘 대표 사진" prepend-icon="mdi-camera" data-testid="input-product-title-image"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedTitleImageFilename">업로드된 파일: {{uploadedTitleImageFilename}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="productContentImage" label="이모티콘 전체 사진" prepend-icon="mdi-camera" data-testid="input-product-content-image"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedContentImageFilename">업로드된 파일: {{uploadedContentImageFilename}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit" data-testid="btn-submit">
                    <v-icon>mdi-check</v-icon>
                    <span>등록</span>
                </v-btn>
                <router-link :to="{ name: 'ProductListPage' }">
                    <v-btn class="ml-1" color="error" @click="onCancel" data-testid="btn-cancel">
                        <v-icon>mdi-cancel</v-icon>
                        <span>취소</span>
                    </v-btn>
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
            categories: ['귀여운','재밌는','메시지']
        }
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToDjango']),
        ...mapActions(accountModule, ['requestNicknameToDjango']),
        async onSubmit () {
            console.log('작성 완료 버튼 누름')

            try {
                const nickname = await this.requestNicknameToDjango()
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
                    await this.$router.push({ name: 'ProductListPage'})

                    window.location.reload(true)
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