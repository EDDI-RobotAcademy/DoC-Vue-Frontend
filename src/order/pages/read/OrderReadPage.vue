<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        구매한 상품<v-icon left>mdi-cash-100</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr class="table-header">
                                    <th>이모티콘</th>
                                    <th>이름</th>
                                    <th>가격</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in orderItemList" :key="item.orderItemId">
                                    <td>
                                        <v-img :src="getImageUrl(item.productTitleImage)" aspect-ratio="1" class="product-image">
                                            <template v-slot:placeholder>
                                                <v-row class="fill-height ma-0" align="center" justify="center"></v-row>
                                            </template>
                                        </v-img>
                                    </td>
                                    <td>{{ item.productName }}</td>
                                    <td>{{ item.productPrice }}</td>
                                    <td>
                                        <v-btn color="red" @click="goToReviewRegisterPage(item.productId)">리뷰 작성</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-divider></v-divider>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="blue" @click="goToLastPage">돌아가기</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const orderModule = 'orderModule';

export default {
    props: {
        ordersId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            orderItem: [],
        };
    },
    computed: {
        ...mapState(orderModule, ['orderItemList'])
    },
    methods: {
        ...mapActions(orderModule, ["requestMyOrderItemListToDjango"]),
        getImageUrl(imageName) {
            return require(`@/assets/images/uploadImages/${imageName}`);
        },
        goToReviewRegisterPage(productId) {
            this.$router.push({
                name: 'ReviewRegisterPage',
                params: { productId: productId.toString() }
            })
        },
        goToLastPage() {
            this.$router.go(-1)
        }
    },
    async mounted() {
        const response = await this.requestMyOrderItemListToDjango(this.ordersId)
        this.orderItem = response
    },

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
