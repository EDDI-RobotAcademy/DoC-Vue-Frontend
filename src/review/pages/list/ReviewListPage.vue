<template>
    <v-container>
        <v-row justify='center'>
            <v-col cols="12" md="12" lg="10">
                <h2 class="title">Emoticon review</h2>
                <v-data-table
                    v-model:items-per-page="perPage"
                    :headers="headerTitle"
                    :items="pagedItems"
                    v-model:pagination="pagination"
                    class="elevation-1"
                    @click:row="readRow"
                    item-value="reviewId">
                    <template v-slot:item="{ item }">
                        <tr @click="readRow(item)">
                            <td>{{ item.reviewId }}</td>
                            <td>{{ item.reviewTitle }}</td>
                            <td>{{ item.reviewWriter }}</td>
                            <td>
                                <v-rating v-model="item.reviewRating" dense readonly></v-rating>
                            </td>
                            <td class="text-right">{{ formatDate(item.reviewRegDate) }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <v-row justify="end">
                    <v-col cols="auto">
                        <v-btn :to="{ name: 'ReviewRegisterPage' }" class="mb-review" height="40">
                            리뷰 작성
                        </v-btn>
                    </v-col>
                </v-row>
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(reviewList.length / perPage)"
                    color="primary"
                    @input="updateItems"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    computed: {
        ...mapState(reviewModule, ['reviewList']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.reviewList.slice(startIdx, endIdx).map(item => ({
                ...item,
                reviewRegDate: this.formatDate(item.reviewRegDate)
            }))
        }
    },
    mounted() {
        this.requestReviewListToDjango().then(() => {
            // 데이터 로드 후 작업 추가 가능
        })
    },
    methods: {
        ...mapActions(reviewModule, ['requestReviewListToDjango']),
        readRow(item) {
            this.$router.push({
                name: 'ReviewReadPage',
                params: { reviewId: item.reviewId.toString() }
            })
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            const date = new Date(dateString)
            return date.toLocaleDateString('ko-KR', options)
        },
        updateItems() {
            // 필요한 경우 페이지네이션 업데이트 로직 추가
        }
    },
    data() {
        return {
            headerTitle: [
                { title: 'No', align: 'start', sortable: true, key: 'reviewId' },
                { title: '제목', align: 'start', key: 'reviewTitle', width: '60%' },
                { title: '작성자', align: 'start', key: 'reviewWriter', width: '10%' },
                { title: '별점', align: 'center', key: 'reviewRating', width: '10%' },
                { title: '등록일자', align: 'end', key: 'reviewRegDate', width: '10%' },
            ],
            perPage: 10, // 고정된 항목 수
            pagination: { page: 1 }
        }
    }
}
</script>

<style>
.mb-review {
    margin-top: 2rem; /* 원하는 공백 크기로 조정 */
    background-color: #FEFEFE;
}
.title {
    text-align: center;
    margin-bottom: 3rem;
}
.text-right {
    text-align: right;
}
</style>
