<template>
    <v-container>
        <h2>판매 상품 리스트</h2>
        <v-row class="justify-center mb-4 align-center">
            <v-col cols="auto">
                <v-select
                    v-model="selectedCategory"
                    :items="categories"
                    label="카테고리 선택"
                    class="category-select custom-select"
                    style="margin-bottom: 0;">
                </v-select>
            </v-col>
            <v-col v-if="isSeller" cols="auto">
                <v-btn :to="{ name: 'ProductRegisterPage' }" class="mb-5" height="40">
                    상품 등록
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="filteredProducts.length > 0">
            <v-col v-for="(product, index) in filteredProducts" :key="index" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToProductReadPage(product.productId)">
                    <v-img :src="getImageUrl(product.productTitleImage)" aspect-ratio="1.5">
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
        <v-row v-else>
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'
const accountModule = 'accountModule'
const authenticationModule = 'authenticationModule'

export default {
    computed: {
        ...mapState(productModule, ['products']),
        filteredProducts() {
            if (this.selectedCategory === '전체') {
                return this.products
            }
            return this.products.filter(product => product.productCategory === this.selectedCategory)
        }
    },
    mounted() {
        this.requestProductListToDjango();
        this.checkRoleType();
    },
    methods: {
        ...mapActions(productModule, ['requestProductListToDjango']),
        ...mapActions(accountModule, ['requestRoleTypeToDjango']),
        async checkRoleType() {
            try {
                const roleType = await this.requestRoleTypeToDjango();
                console.log('roleType:', roleType);
                this.isSeller = (roleType === 'SELLER');
            } catch (error) {
                console.log('사업자가 아닙니다!');
            }
        },
        getImageUrl(imageName) {
            return require('@/assets/images/uploadImages/' + imageName);
        },
        goToProductReadPage(productId) {
            this.$router.push({
                name: 'ProductReadPage',
                params: { productId: productId }
            });
        }
    },
    data() {
        return {
            categories: ['전체', '귀여운','재밌는','다정한'],
            selectedCategory: '전체',
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'productId',
                },
                { title: '이모티콘 이름', align: 'end', key: 'productName' },
                { title: '이모티콘 가격(원)', align: 'end', key: 'productPrice' },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            },
            isSeller: false // 판매자 여부를 저장하는 상태 변수
        }
    }
}
</script>

<style>
.category-select {
    width: 300px; /* 원하는 너비로 조정 */
}

.custom-select .v-input__control {
    background-color: #deed933a; /* 원하는 배경색으로 변경 */
    color: #a71616; /* 원하는 글자색으로 변경 */
}

.custom-select .v-select__selections {
    color: #333; /* 선택된 항목의 글자색 변경 */
}

.custom-select .v-label {
    color: #a71616; /* 레이블 색상 변경 */
}
.mb-5 {
    background-color: #deed933a
}
</style>
