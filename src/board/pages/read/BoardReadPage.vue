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
                            <v-btn color="primary">수정</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn color="error" @click="onDelete">삭제</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <router-link :to="{ name: 'BoardListPage' }">
                                <v-btn color="secondary">돌아가기</v-btn>
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
        ...mapActions(boardModule, ['requestBoardToDjango']),
        async onDelete () {
            console.log('삭제를 누르셨습니다!')
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