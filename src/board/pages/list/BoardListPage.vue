<template lang="">
    <v-container>
        <v-row justify='center'>
            <v-col cols="12" md="10" lg="8">
                <h2 class="title">게시글</h2>
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
                            게시글 작성
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
    margin-top: 2rem; /* 원하는 공백 크기로 조정 */
    background-color: #FEFEFE;
}
.title {
    text-align: center;
    margin-bottom: 3rem;
}
</style>
