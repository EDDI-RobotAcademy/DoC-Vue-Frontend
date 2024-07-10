<template>
    <v-container>
        <v-col cols="2" class="d-flex align-center justify-center">
            <v-img src="@/assets/images/fixed/kakao.png" height="100%" contain></v-img>
        </v-col>

        <v-card v-if="product">
            <v-card-title>상품 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="5" class="d-flex align-center justify-center">
                            <v-img :src="getProductImageUrl(product.productTitleImage)"
                                class="custom-img grey lighten-2" aspect-ratio="1"
                                style="width: 100%; height: auto; max-height: 200px;">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5" />
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
                            <v-row>
                                <v-col cols="12">
                                    <h1 class="product-name">{{ product.productName }}</h1>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <p class="product-writer">{{ product.writer }}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <p class="product-price">
                                        {{ product.productPrice }}
                                        <span class="original-price">{{ product.originalPrice }}</span>
                                        <span class="currency">원</span>
                                    </p>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <v-btn color="yellow darken-2" dark @click="confirmCheckout" class="action-button">
                                        <v-icon left>mdi-cart</v-icon>구매하기
                                    </v-btn>
                                    <v-btn color="success" @click="onAddToCartAndAsk" class="action-button">
                                        <v-icon left>mdi-cart-plus</v-icon>장바구니에 추가
                                    </v-btn>
                                    <v-btn color="primary" @click="goToThisProductReviewList" class="action-button">
                                        <v-icon left>mdi-message-draw</v-icon>리뷰 보기
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="5">
                            <span>이 이모티콘의 태그</span>
                            <v-text-field class="custom-text-field" v-model="product.productCategory" readonly />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="5">
                            <v-textarea class="custom-text-field" v-model="product.content" label="내용" readonly rows="1"
                                auto-grow />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="getProductImageUrl(product.productContentImage)" aspect-ratio="2"
                                style="width: 100%; max-height: none;"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <v-alert v-else type="info">현재 등록된 상품이 없습니다!</v-alert>
        <v-spacer></v-spacer>
        <br>
        <h2 v-if="product && product.productCategory">
            #<span class="category-text">{{ product.productCategory }}</span> 카테고리 연관 상품
        </h2> <br>
        <v-spacer></v-spacer>
        <v-row v-if="products.length > 0">
            <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToProductReadPage(product.productId)">
                    <v-img :src="getProductImageUrl(product.productTitleImage)" aspect-ratio="1.5">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5" />
                            </v-row>
                        </template>
                    </v-img>
                    <v-card-title>{{ product.productName }}</v-card-title>
                    <v-card-subtitle>{{ product.productPrice }}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" class="mt-4">
            <v-col cols="auto">
                <router-link :to="{ name: 'ProductListPage' }" class="router-link no-underline">
                    <v-btn color="#E3EF76" class="action-button">
                        <v-icon left>mdi-arrow-left</v-icon>
                        <span>돌아가기</span>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>
        <v-dialog v-model="isCheckoutDialogVisible" max-width="500">
            <v-card>
                <v-card-title>Message</v-card-title>
                <v-card-text>
                    정말 구매하시겠습니까?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="isCheckoutDialogVisible = false">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="onPurchase">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="isGoToCartListDialogVisible" max-width="500">
            <v-card>
                <v-card-title>Message</v-card-title>
                <v-card-text>
                    장바구니에 추가 되었습니다.
                    장바구니로 이동하시겠습니까?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="isGoToCartListDialogVisible = false">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="goToCartList">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '@/router'

const productModule = 'productModule'
const cartModule = 'cartModule'
const orderModule = 'orderModule'

export default {
    props: {
        productId: {
            type: String,
            required: true,
        },
        productCategory: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            isCheckoutDialogVisible: false,
            isGoToCartListDialogVisible: false,
        }
    },
    computed: {
        ...mapState(productModule, ['product', 'products'])
    },
    methods: {
        ...mapActions(productModule, [
            'requestProductToDjango', 
            'requestRandomFourProductListToDjango'
        ]),
        ...mapActions(cartModule, [
            'requestAddCartToDjango',
             'requestDeleteCartItemToDjango',
             'requestCartItemDuplicationCheckToDjango'
            ]),
        ...mapActions(orderModule, [
            'requestProductReadToAddOrderToDjango',
            'requestOrderItemDuplicationCheckToDjango'
        ]),
        async onPurchase() {
            this.isCheckoutDialogVisible = false
            console.log('이모티콘 구매')
            try {
                const userToken = localStorage.getItem('userToken')
                const payload = {
                    userToken: userToken,
                    productId: this.product.productId
                }
                console.log('payload:', payload)
                const isDuplicatedOrderItem = await this.requestOrderItemDuplicationCheckToDjango(payload)
                console.log('isDuplicate:', isDuplicatedOrderItem)
                if (isDuplicatedOrderItem) {
                    alert('이미 구매하신 상품입니다.')
                } else {
                    try {
                        const userToken = localStorage.getItem('userToken')
                        const payload = {
                            userToken,
                            productId: this.product.productId,
                            productPrice: this.product.productPrice,
                        }
                        console.log('orderItem:', payload)
                        const response = await this.requestProductReadToAddOrderToDjango(payload);
                        await this.requestDeleteCartItemToDjango({ productId: [this.product.productId] })
                        console.log('장바구니에 있었으면 삭제 성공')

                        alert('구매가 완료되었습니다.')
                    } catch (error) {
                        console.log('상품 구매 중 에러 발생:', error)
                    }
                }
            } catch (error) {
                console.log('이미 구매한 상품인지 확인 중 에러 발생:', error)
            }
        },
        async onAddToCartAndAsk() {
            console.log('장바구니에 추가 버튼 눌렀음')
            try {
                const userToken = localStorage.getItem('userToken')
                const payload = {
                    userToken: userToken,
                    productId: this.product.productId
                }
                console.log('payload:', payload)
                const isDuplicatedOrderItem = await this.requestOrderItemDuplicationCheckToDjango(payload)
                const isDuplicatedCartItem = await this.requestCartItemDuplicationCheckToDjango(payload)
                console.log('isDuplicate:', isDuplicatedOrderItem)
                if (isDuplicatedOrderItem) {
                    alert('이미 구매하신 상품입니다.')
                } else if (isDuplicatedCartItem) {
                    alert('장바구니에 있는 상품입니다.')
                } else {
                    try {
                        this.isGoToCartListDialogVisible = true
                        const cartData = {
                        productId: this.product.productId,
                        productName: this.product.productName,
                        productPrice: this.product.productPrice,
                        }
                        await this.requestAddCartToDjango(cartData)
                        } catch (error) {
                            console.log('장바구니 추가 과정에서 에러 발생:', error)
                         }
                }
            } catch (error) {
                console.log('이미 구매한 상품인지 확인 중 에러 발생:', error)
            }
        },
        async checkOrdersItemDuplication () {
            console.log('닉네임 중복 검사')

            try {
                const isDuplicate = await this.requestOrdersItemDuplicationCheckToDjango({
                    productId: this.product.productId})

                if (isDuplicate) {
                    this.ordersItemErrorMessages = ['이 nickname은 이미 사용중입니다!']
                    this.isNicknameValid = false
                } else {
                    this.nicknameErrorMessages = []
                    this.isNicknameValid = true
                }
            } catch (error) {
                alert('닉네임 중복 확인에 실패했습니다!')
                this.isNicknameValid = false
            }
        },
        getProductImageUrl(imageName) {
            return require(`@/assets/images/uploadImages/${imageName}`)
        },
        confirmCheckout() {
            this.isCheckoutDialogVisible = true;
        },
        goToCartList() {
            router.push('/cart/list')
        },
        goToThisProductReviewList() {
            this.$router.push({
                name: 'ReviewProductListPage',
                params: { productId: this.product.productId.toString() }
            });
        },
        goToProductReadPage(productId) {
            this.$router.push({
                name: 'ProductReadPage',
                params: { productId: productId }
            });
        },
        async fetchProductData(productId) {
            await this.requestProductToDjango(productId);
            if (this.product && this.product.productCategory) {
                console.log(this.product.productCategory);
                await this.requestRandomFourProductListToDjango(this.product.productCategory);
            }
        }
    },
    async created() {
        await this.fetchProductData(this.productId);
    },
    watch: {
        '$route.params.productId': {
            handler(newProductId) {
                this.fetchProductData(newProductId);
            },
            immediate: true,
        }
    }
}
</script>

<style scoped>
.custom-img {
    max-width: 100%;
    height: auto;
}

.product-name {
    font-size: 40px;
    font-weight: bold;
    margin: 0;
}

.product-writer {
    font-size: 16px;
    color: grey;
    margin-top: 0;
}

.product-price {
    font-size: 24px;
    color: red;
}

.original-price {
    font-size: 18px;
    color: grey;
    text-decoration: line-through;
    margin-left: 10px;
}

.action-button {
    margin: 10px 10px 0 0;
    font-weight: bold;
}

.no-underline {
    text-decoration: none;
}

.currency {
    font-size: 14px;
    vertical-align: baseline;
    margin-left: 3px;
}
.category-text {
    color: rgb(183, 100, 93);
    font-size: 18px; /* 원하는 크기로 조정 */
}
</style>
