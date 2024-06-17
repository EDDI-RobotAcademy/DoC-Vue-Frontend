<template>
    <v-container>
        <v-row>
            <v-col cols="12">
        
                <v-text-field v-model="prodname" label="이모티콘 이름"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="price" label="이모티콘 가격"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="writer" label="등록자"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="content" label="이모티콘 상세 설명" auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="productImage" label="이모티콘 대표 사진" perpend-icon="mdi-camera"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p v-if="uploadedFilename">업로드된 파일: {{uploadedFilename}}></p>
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

export default {
    data () {
        return {
            productName: '',
            productPrice: '',
            writer: '',
            content: '',
            productImage: null,
            uploadedFilename: '',
        }
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToDjango']),
        async onSubmit () {
            console.log('작성 완료 버튼 누름')

            try {
                if (this.productImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('productName', this.productName)
                    imageFormData.append('productPrice', this.productPrice)
                    imageFormData.append('writer', this.writer)
                    imageFormData.append('content', this.content)
                    imageFormData.append('productImage', this.productImage)

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