<template>
    <v-container>
        <v-card v-if="board">
            <v-card-title>게시물 수정</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="boardTitle" label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="board.boardWriter" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="boardContent" label="내용" auto-grow/>
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
                            <router-link :to="{ name: 'BoardReadPage' }">
                                <v-btn color="secondary">
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

const boardModule = 'boardModule'

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            boardTitle: '',
            boardWriter: '',
            boardContent: '',
        }
    },
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardToDjango', 'requestModifyBoardToDjango']),
        async onModify () {
            try {
                const payload = {
                boardTitle: this.boardTitle,
                boardContent: this.boardContent,
                boardId: this.boardId,
                }

                await this.requestModifyBoardToDjango(payload)
                await this.$router.push({ 
                    name: 'BoardReadPage',
                    params: { boardId: this.boardId } 
                })
            } catch (error) {
                console.error('수정 중 에러 발생:', error)
            }
        }
    },
    created () {
        this.requestBoardToDjango(this.boardId).then(() => {
            this.boardTitle = this.board.boardTitle
            this.boardWriter = this.board.boardWriter
            this.boardContent = this.board.boardContent
        })
    },
}
</script>