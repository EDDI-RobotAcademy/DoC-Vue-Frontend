<template>
    <v-container>
        <v-col cols="2" class="d-flex align-center justify-center">
            <!-- v-img 컴포넌트를 사용하여 이미지를 삽입 -->
            <v-img src="@/assets/images/fixed/kakao.png" height="100%" contain></v-img>
        </v-col>

        <v-card v-if="product">
            <v-card-title>상품 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <!-- 상품 이미지 왼쪽 열 -->
                        <v-col cols="12" md="4" class="d-flex align-center justify-center">
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
                        <!-- 상품 정보 오른쪽 열 -->
                        <v-col cols="12" md="8" class="d-flex flex-column justify-center">
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
                        <v-col cols="12" md="4">
                            <span>이 이모티콘의 태그</span>
                            <v-text-field class="custom-text-field" v-model="product.productCategory" readonly />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field class="custom-text-field" v-model="product.content" label="내용" readonly />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="getProductImageUrl(product.productContentImage)" aspect-ratio="2"
                                style="width: 100%; max-height: 400px;"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <v-alert v-else type="info">현재 등록된 상품이 없습니다!</v-alert>
        
        <v-row justify="center" class="mt-4">
            <v-col cols="auto">
                <router-link :to="{ name: 'ProductListPage' }" class="router-link no-underline">
                    <v-btn color="secondary" class="action-button">
                        <v-icon left>mdi-arrow-left</v-icon>목록으로 돌아가기
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
        }
    },
    data () {
        return {
            isCheckoutDialogVisible: false,
            isGoToCartListDialogVisible: false,
        }
    },
    computed: {
        ...mapState(productModule, ['product'])
    },
    methods: {
        ...mapActions(productModule, ['requestProductToDjango']),
        ...mapActions(cartModule, ['requestAddCartToDjango', 'requestDeleteCartItemToDjango']),
        ...mapActions(orderModule, ['requestProductReadToAddOrderToDjango']),
        async onPurchase() {
            this.isCheckoutDialogVisible = false
            console.log('이모티콘 구매')
            try {
                const userToken = localStorage.getItem('userToken')
                const payload = {
                    userToken,
                    productId: this.product.productId,
                    productPrice: this.product.productPrice,
                }
                console.log('orderItem:', payload)
                const response = await this.requestProductReadToAddOrderToDjango(payload);
                await this.requestDeleteCartItemToDjango( {productId: [this.product.productId] })
                console.log('장바구니에 있었으면 삭제 성공')

            } catch (error) {
                console.log('상품 구매 중 에러 발생:', error)
            }

        },
        async onAddToCartAndAsk() {
            this.isGoToCartListDialogVisible = true
            console.log('장바구니에 추가 버튼 눌렀음')
            try {
                const cartData = {
                    productId: this.product.productId,
                    productName: this.product.productName,
                    productPrice: this.product.productPrice,

                }
                await this.requestAddCartToDjango(cartData)
            } catch (error) {
                console.log('장바구니 추가 과정에서 에러 발생:', error)
            }
        },
        getProductImageUrl(imageName) {
            console.log('imageName:', imageName)
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
                params: { productId: this.product.productId }
            });
        }
    },
    created() {
        this.requestProductToDjango(this.productId)
    },
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
</style>
