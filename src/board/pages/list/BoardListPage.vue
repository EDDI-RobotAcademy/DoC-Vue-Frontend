<template lang="">
    <div class="background-image">
        <v-container>
        <v-row justify='center'>
            <v-col cols="12" md="10" lg="8">
                <h2 class="title">
                    <span>자유 게시판</span>
                    <v-icon class="ml-auto">mdi-draw</v-icon>
                </h2>
                <v-data-table
                    v-model:items-per-page="perPage"
                    :headers="headerTitle"
                    :items="pagedItems"
                    v-model:pagination="pagination"
                    class="elevation-1"
                    @click:row="readRow"
                    item-value="boardId"/>
                <v-row justify="end">
                    <v-col cols="auto">
                        <v-btn :to="{ name: 'BoardRegisterPage' }" class="mb-board" height="40">
                            <v-icon>mdi-pencil</v-icon>
                            <span>게시글 작성</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(boardList.length / perPage)"
                    color="primary"
                    @input="updateItems"/>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const boardModule = 'boardModule'

export default {
    computed: {
        ...mapState(boardModule, ['boardList']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.boardList.slice(startIdx, endIdx).map(item => ({
                ...item,
                boardRegDate: this.formatDate(item.boardRegDate)
            }))
        }
    },
    mounted() {
        this.requestBoardListToDjango()
    },
    methods: {
        ...mapActions(boardModule, ['requestBoardListToDjango']),
        readRow(event, { item }) {
            this.$router.push({
                name: 'BoardReadPage',
                params: { boardId: item['boardId'].toString() }
            })
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            const date = new Date(dateString)
            return date.toLocaleDateString('ko-KR', options)
        }
    },
    data() {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'boardId',
                },
                { title: '제목', align: 'start', key: 'boardTitle', width: '60%' },
                { title: '작성자', align: 'center', key: 'boardWriter', width: '20%' },
                { title: '등록일자', align: 'center', key: 'boardRegDate', width: '20%' },
            ],
            perPage: 10, // 고정된 항목 수
            pagination: {
                page: 1,
            }
        }
    }
}
</script>

<style>
.mb-board {
    margin-top: 2rem;
    /* 원하는 공백 크기로 조정 */
    background-color: #FEFEFE;
}

.title {
    text-align: center;
    margin-bottom: 3rem;
}
.background-image {
    background-image: url('@/assets/images/fixed/배경.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
    /* 화면 전체 높이 */
    width: 100vw;
    /* 화면 전체 너비 */
    overflow: auto;
    /* 콘텐츠가 넘칠 경우 스크롤 */
}
</style>
