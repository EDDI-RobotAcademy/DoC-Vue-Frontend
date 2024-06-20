<template>
    <v-container>
        <v-card v-if="board">
            <v-card-title>게시글 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="board.boardTitle" readonly label="제목"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="board.boardWriter" readonly label="작성자"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea v-model="board.boardContent" readonly label="내용" auto-grow/>
                        </v-col>
                    </v-row>
                    <v-row v-if="board.boardImage">
                        <v-col cols="12" class="text-center">
                            <v-img :src="getImageUrl(board.boardImage)" aspect-ratio="3.5" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"/>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-col cols="auto">
                            <v-btn color="primary">
                                <router-link :to="{ name: 'BoardModifyPage', params: { boardId } }"
                                                class="router-link-no-underline">
                                    <v-icon>mdi-draw</v-icon>
                                    <span>수정</span>
                                </router-link>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">
                                <v-icon>mdi-eraser</v-icon>
                                <span>삭제</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'BoardListPage' }">
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
    computed: {
        ...mapState(boardModule, ['board'])
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardToDjango', 'requestDeleteBoardToDjango']),
        async onDelete () {
            console.log('삭제를 누르셨습니다!')
            await this.requestDeleteBoardToDjango(this.boardId)
            await this.$router.push({ name: 'BoardListPage' })
        },
        getImageUrl (imageName) {
            return require(`@/assets/images/uploadImages/${imageName}`)
        },
    },
    created () {
        this.requestBoardToDjango(this.boardId)
    },
}
</script>

<style scoped>
.router-link-no-underline{
    text-decoration-line: none;
    color: inherit;
}
</style>