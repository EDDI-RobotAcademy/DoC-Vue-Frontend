<template lang="">
        <div class="background-image">
    <v-container>
        <v-row justify='center' v-if="orderList.length > 0">
            <v-col cols="12" md="10" lg="8">
                <h2 class="title">
                    <span>내 주문 목록</span>
                    <v-icon class="ml-auto">mdi-clipboard-list-outline</v-icon>
                </h2>
                <v-data-table
                    v-model:items-per-page="perPage"
                    :headers="headerTitle"
                    :items="pagedItems"
                    v-model:pagination="pagination"
                    class="elevation-1"
                    @click:row="readRow"
                    item-value="ordersId"/>
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
        <v-row justify='center' v-else class="no-orders">
            <p class="no-orders-text">주문 기록이 없습니다.</p>
        </v-row>
    </v-container>
</div>
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
                totalPrice: this.formatPrice(item.totalPrice),  // totalPrice 포맷팅
                createdDate: this.formatDate(item.createdDate)  // createdDate 포맷팅
            }))
        }
    },
    mounted() {
        this.requestMyOrderListToDjango()
    },
    methods: {
        ...mapActions(orderModule, ['requestMyOrderListToDjango']),
        readRow(event, { item }) {
            this.$router.push({
                name: 'OrderReadPage',
                params: { ordersId: item['ordersId'].toString() }
            })
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
            const date = new Date(dateString)
            return date.toLocaleDateString('ko-KR', options)
        },
        formatPrice(price) {
            return Math.round(price).toLocaleString();  // 반올림하고 천 단위로 콤마 추가
        },
        goToLastPage() {
            this.$router.go(-1)
        }
    },
    data() {
        return {
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'ordersId',
                },
                { title: '수량', align: 'start', key: 'totalQuantity', width: '20%' },
                { title: '금액', align: 'start', key: 'totalPrice', width: '40%' },
                { title: '구매 일자', align: 'start', key: 'createdDate', width: '40%' },
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
    font-size: 1.3em;
    /* Increase the font size */
    font-weight: 900;
    /* Make the font bold */
}

.product-image {
    max-width: 50px;
    /* 이미지의 최대 너비 */
    max-height: 50px;
    /* 이미지의 최대 높이 */
    object-fit: contain;
    /* 이미지의 비율을 유지하면서 컨테이너에 맞춤 */
}

.no-orders {
    text-align: center;
    /* 텍스트를 가운데 정렬 */
    margin-top: 20px;
    /* 원하는 공백 크기로 조정 */
    font-size: 1.2em;
    /* 글자 크기를 키움 */
}

.no-orders-text {
    margin-top: 10px;
    /* 텍스트 위쪽 마진 조정 */
}
</style>
