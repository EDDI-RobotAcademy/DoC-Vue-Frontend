<template>
    <v-container>
        <h2 class="title">게시물 작성 페이지</h2>
        <v-row>
            <v-col cols="12">
                <p class="subtitle">제목</p>
                <br> 
                <v-text-field v-model="boardTitle" required/>
            </v-col>
        </v-row>
        <br>
        <!-- <v-row>
            <v-col cols="12">
                <p class="writer">작성자</p>
                <v-text-field v-model="boardWriter" required/>
            </v-col>
        </v-row> -->
        <v-row>
            <v-col cols="12">
                <p class="context">내용</p>
                <br> 
                <v-textarea v-model="boardContent" required auto-grow/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-file-input v-model="boardImage" label="이미지" prepend-icon="mdi-camera"/>
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
import { mapActions, mapGetters } from 'vuex'

const boardModule = 'boardModule'
const accountModule = 'accountModule'
const authenticationModule = 'authenticationModule'

export default {
    data () {
        return {
            boardTitle: '',
            boardWriter: '',
            boardContent: '',
            boardImage: null,
            uploadedFileName: '',
        }
    },
    methods: {
        ...mapActions(boardModule, ['requestCreateBoardToDjango']),
        ...mapActions(accountModule, ['requestNicknameToDjango']),
        async onSubmit () {
            try {
                const nickname = await this.requestNicknameToDjango()
                console.log('nickname:', nickname)

                if (this.boardTitle) {
                    const imageFormData = new FormData()
                    imageFormData.append('boardTitle', this.boardTitle)
                    imageFormData.append('boardWriter', nickname)  
                    imageFormData.append('boardContent', this.boardContent)
                    if (this.boardImage) {
                        imageFormData.append('boardImage', this.boardImage)
                    }
    
                    const response = await this.requestCreateBoardToDjango(imageFormData)

                    if (this.boardImage) {
                        this.uploadedFileName = response.data.imageName
                    }

                    await this.$router.push({
                        name: 'BoardReadPage',
                        params: { boardId: response.data.boardId.toString() }
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
        async onCancel () {
            console.log('등록 취소')
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.title{
    text-align: center;
}
.subtitle{
    text-align: start;
}
.writer{
    text-align: start;
}
</style>
