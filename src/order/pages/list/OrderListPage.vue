<template lang="">
    <v-container>
        <v-row justify='center'>
            <v-col cols="12" md="10" lg="8">
                <h2 class="title">내 주문 목록</h2>
                <v-data-table
                    v-model:items-per-page="perPage"
                    :headers="headerTitle"
                    :items="pagedItems"
                    v-model:pagination="pagination"
                    class="elevation-1"
                    item-value="orderId"/>
                <v-row justify="end">
                    <v-col cols="auto">
                    </v-col>
                </v-row>
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(orderList.length / perPage)"
                    color="primary"
                    @input="updateItems"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="blue" @click="goLastPage">이전 페이지</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const orderModule = 'orderModule'

export default {
    computed: {
        ...mapState(orderModule, ['orderList']),
        pagedItems() {
            const startIdx = (this.pagination.page - 1) * this.perPage
            const endIdx = startIdx + this.perPage
            return this.orderList.slice(startIdx, endIdx).map(item => ({
                ...item,
                orderDate: this.formatDate(item.orderDate)
            }))
        }
    },
    mounted() {
        this.requestMyOrderListToDjango()
    },
    methods: {
        ...mapActions(orderModule, ['requestMyOrderListToDjango']),
        // readRow(event, { item }) {
        //     this.$router.push({
        //         name: 'OrderReadPage',
        //         params: { orderId: item['orderId'].toString() }
        //     })
        // },
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
                    key: 'orderId',
                },
                { title: '총 결제액', align: 'start', key: 'totalPrice', width: '60%' },
                { title: '구매 일자', align: 'start', key: 'orderData', width: '20%' },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            }
        }
    }
};
</script>

<style>
.table-header th {
    font-size: 1.3em; /* Increase the font size */
    font-weight: 900; /* Make the font bold */
}

.product-image {
    max-width: 50px; /* 이미지의 최대 너비 */
    max-height: 50px; /* 이미지의 최대 높이 */
    object-fit: contain; /* 이미지의 비율을 유지하면서 컨테이너에 맞춤 */
}
</style>
