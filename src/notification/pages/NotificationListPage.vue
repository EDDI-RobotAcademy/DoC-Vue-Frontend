<template lang="">
    <v-container>
        <v-row justify='center' v-if="expectedSecedeList.length > 0">
            <v-col cols="12" md="10" lg="8">
                <h2 class="title">
                    <span>이탈이 예상되는 고객</span>
                    <v-icon class="ml-auto">mdi-emoticon-cry-outline</v-icon>
                </h2>
                <v-data-table
                    v-model:items-per-page="perPage"
                    :headers="headerTitle"
                    :items="pagedItems"
                    v-model:pagination="pagination"
                    class="elevation-1"
                    item-value="accountId"/>
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(expectedSecedeList.length / perPage)"
                    color="primary"
                    @input="updateItems"/>
            </v-col>
        </v-row>
        <v-row justify='center' v-else class="no-expected-customers">
            <p class="no-customers-text">이탈이 예상되는 고객이 없습니다.</p>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const notificationModule = 'notificationModule'

export default {
    computed: {
        ...mapState(notificationModule, ['expectedSecedeList']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.expectedSecedeList.slice(startIdx, endIdx).map(item => ({
                ...item,
                lastOrderedDate: this.formatDate(item.lastOrderedDate)
            }))
        }
    },
    mounted() {
        this.requestExpectedSecedeListToDjango()
    },
    methods: {
        ...mapActions(notificationModule, ['requestExpectedSecedeListToDjango']),
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            const date = new Date(dateString)
            return date.toLocaleDateString('ko-KR', options)
        },
        goToLastPage() {
            this.$router.go(-1)
        }
    },
    data() {
        return {
            headerTitle: [
                {
                    title: 'ID',
                    align: 'start',
                    sortable: true,
                    key: 'accountId',
                },
                { title: '이메일', align: 'start', key: 'email', width: '50%' },
                { title: '가장 최근 주문 일자', align: 'start', key: 'lastOrderedDate', width: '40%' },
            ],
            perPage: 10,
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
.no-expected-customers {
    text-align: center; /* 텍스트를 가운데 정렬 */
    margin-top: 20px; /* 원하는 공백 크기로 조정 */
    font-size: 1.2em; /* 글자 크기를 키움 */
}
.no-customers-text {
    margin-top: 10px; /* 텍스트 위쪽 마진 조정 */
}
</style>
