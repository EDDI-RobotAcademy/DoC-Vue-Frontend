<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        내 장바구니<v-icon left>mdi-basket</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                            <tr class="table-header">
                                <th>선택</th>
                                <th>이모티콘</th>
                                <th>이름</th>
                                <th>가격</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cartItems" :key="item.cartItemId">
                                <td>
                                    <v-checkbox v-model="selectedItems" :value="item"></v-checkbox>
                                </td>
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
                                    <v-btn color="red" @click="removeItem(item)">장바구니에서 제거</v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </v-table>
                        <v-divider></v-divider> 
                        <v-row>
                            <v-col>
                                <v-btn color="blue" @click="confirmCheckOut">구매하기</v-btn>
                            </v-col>
                            <v-col class="text-right">
                                <strong>Total: {{ selectedItemsTotal }}</strong>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="isCheckoutDialogVisible" max-width="500">
            <v-card>
                <v-card-title>Confirm Checkout</v-card-title>
                <v-card-text>
                    Are you sure you want to order the selected items?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text 
                        @click="isCheckoutDialogVisible = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="proceedToOrder">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

const cartModule = 'cartModule'
// const orderModule = 'orderModule'

export default {
    data() {
        return {
            cartItems: [],
            selectedItems: [],
            isCheckoutDialogVisible: false,
        };
    },
    computed: {
        cartTotal() {
            if (!Array.isArray(this.cartItems) || this.cartItems.length === 0) {
                return 0;
            }
            return this.cartItems.reduce(
                (total, item) => total + item.productPrice * item.quantity,
                0
            );
        },
        selectedItemsTotal() {
            if (!Array.isArray(this.selectedItems) || this.selectedItems.length === 0) {
                return 0;
            }
            return this.selectedItems.reduce(
                (total, item) => total + item.productPrice * item.quantity,
                0
            );
        },
    },
    methods: {
        ...mapActions(cartModule, ["requestCartListToDjango", "requestDeleteCartItemToDjango"]),
        // ...mapActions("orderModule", ["requestCreateOrderToDjango"]),
        // updateQuantity(item) {
        // },
        getImageUrl (imageName) {
            return require(`@/assets/images/uploadImages/${imageName}`)
        },
        async removeItem(item) {
            try {
                await this.requestDeleteCartItemToDjango(item.cartItemId);
                this.cartItems = this.cartItems.filter(
                    cartItem => cartItem.cartItemId !== item.cartItemId
                );
                this.selectedItems = this.selectedItems.filter(
                    selectedItem => selectedItem.cartItemId !== item.cartItemId
                );
            } catch (error) {
                console.error("장바구니 상품 삭제 중 에러 발생:", error);
            }
        },
        confirmCheckout() {
            this.isCheckoutDialogVisible = true;
        },
        async proceedToOrder() {
            this.isCheckoutDialogVisible = false;
            try {
                const selectedCartItems = this.cartItems.filter(item => this.selectedItems.includes(item));
                const orderItems = selectedCartItems.map(item => ({
                    cartItemId: item.cartItemId,
                    orderPrice: item.productPrice,
                    quantity: item.quantity
                }));
                console.log('orderItems:', orderItems)
                const response = await this.requestCreateOrderToDjango({ items: orderItems });
                const orderId = response.orderId;
                console.log(orderId)
            } catch (error) {
                console.error('Order creation failed:', error);
            }
        },
        async fetchCartList() {
            try {
                const response = await this.requestCartListToDjango();
                this.cartItems = response;
            } catch (error) {
                console.error("Error fetching cart list:", error);
            }
        },
    },
    created() {
        this.fetchCartList();
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
