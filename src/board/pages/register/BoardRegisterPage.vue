<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="boardTitle" label="제목" required/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="boardContent" label="내용" required auto-grow/>
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
                <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
                <v-btn class="ml-1" color="error" @click="onCancel">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const boardModule = 'boardModule'

export default {
    data () {
        return {
            boardTitle: '',
            boardContent: '',
            boardImage: null,
            uploadedFileName: '',
        }
    },
    methods: {
        ...mapActions(boardModule, ['requestCreateBoardToDjango']),
        async onSubmit () {
            console.log('등록 완료')

            try {
                if (this.boardImage) {
                    const imageFormData = new FormData()
                    imageFormData.append('boardTitle', this.boardTitle)
                    imageFormData.append('boardContent', this.boardContent)
                    imageFormData.append('boardImage', this.boardImage)

                    const response = await this.requestCreateBoardToDjango(imageFormData)
                    this.uploadedFileName = response.data.imageName
                    this.$router.push({ name: 'BoardListPage' })
                } else {
                    console.log('이미지 파일을 선택하세요!')
                }
            } catch (error) {
                console.log('파일 처리 과정에서 에러 발생:', error)
            }

            const payload = {
                boardTitle: this.boardTitle,
                boardContent: this.boardContent,
                boardImage: this.boardImage,
            }

            console.log('payload check:', payload)

            const board = await this.requestCreateBoardToDjango(payload)
        },
        async onCancel () {
            console.log('등록 취소')
        }
    }
}
</script>