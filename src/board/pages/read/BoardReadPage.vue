<template>
    <v-container>
        <v-card v-if="board">
            <v-card-title>
                <v-row align="center" no-gutters>
                    <!-- 제목과 작성자 영역 -->
                    <v-col cols="12">
                        <v-row>
                            <v-col class="title">{{ board.boardTitle }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col class="writer">{{ board.boardWriter }}</v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <v-container>
                    <!-- 게시물 상세 이미지 영역 -->
                    <v-row v-if="board.boardImage">
                        <v-col cols="12" class="text-center">
                            <v-img :src="getImageUrl(board.boardImage)" aspect-ratio="8" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"/>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div class="board-content">{{ board.boardContent }}</div>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto" v-if="isWriter">
                            <v-btn color="primary">
                                <router-link :to="{ name: 'BoardModifyPage', params: { boardId } }"
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
                            <router-link :to="{ name: 'BoardListPage' }">
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

const boardModule = 'boardModule'
const accountModule = 'accountModule'

export default {
    props: {
        boardId: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            isWriter: false,
            isAdmin: false,
        }
    },
    computed: {
        ...mapState(boardModule, ['board']),
        isWriterOrAdmin() {
            return this.isWriter || this.isAdmin;
        }
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardToDjango', 'requestDeleteBoardToDjango']),
        ...mapActions(accountModule, ['requestNicknameToDjango', 'requestRoleTypeToDjango']),
        async checkNickname() { 
            try {
                const nickname = await this.requestNicknameToDjango()
                console.log('nickname:', nickname)
                console.log('boardWriter:', this.board.boardWriter)
                console.log('nickname === this.board.boardWriter:', nickname === this.board.boardWriter)
                this.isWriter = (nickname === this.board.boardWriter)
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
            await this.requestDeleteBoardToDjango(this.boardId)
            await this.$router.push({ name: 'BoardListPage' })
        },
        getImageUrl (imageName) {
            return require('@/assets/images/uploadImages/' + imageName)
        },
    },
    async mounted () {
        await this.requestBoardToDjango(this.boardId)
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
    margin-top: 3pc;
}
.writer {
    text-align: start;
    font-size: 15px;
    margin-top: -3pc;
    margin-bottom: 3pc;
}
.board-content {
    white-space: pre-wrap;
    font-size: 16px;
    text-align: center;
}
.divider{
    border-top: 5px solid #000;
}
</style>
