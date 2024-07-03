<template>
    <v-container>
        <h2>판매 상품 리스트</h2>
        <v-row class="justify-center mb-4 align-center">
            <v-col cols="auto">
                <v-select v-model="selectedCategory" :items="categories" label="카테고리 선택"
                    class="category-select custom-select" style="margin-bottom: 0;">
                </v-select>
            </v-col>
            <v-col cols="auto">
                <v-text-field v-model="searchQuery" label="검색" clearable class="search-input custom-select" 
                    style="margin-bottom: 0; max-width: 300px;">
                </v-text-field>
            </v-col>
            <v-col v-if="isSeller" cols="auto">
                <v-btn :to="{ name: 'ProductRegisterPage' }" class="mb-5" height="40">
                    상품 등록
                </v-btn>
            </v-col>
        </v-row>
        <h1>추천 이모티콘<span class="small-icon">></span></h1>
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
        <v-spacer class="my-10  "></v-spacer>

        <!-- 전체 이모티콘 섹션 -->
        <v-spacer class="my-10"></v-spacer>
        <h1>전체 이모티콘<span class="small-icon">></span></h1>
        <v-row v-if="filteredProducts.length > 0">
            <v-col v-for="(product, index) in filteredProducts" :key="index" cols="12" sm="6" md="6" lg="4">
                <v-card @click="goToProductReadPage(product.productId)" class="product-card">
                    <v-row no-gutters>
                        <!-- Left Column (Product Name and Author) -->
                        <v-col cols="8">
                            <v-card-title>{{ product.productName }}</v-card-title>
                            <v-card-subtitle>{{ product.productPrice }}</v-card-subtitle>
                        </v-col>
                        <!-- Right Column (Product Image) -->
                        <v-col cols="4">
                            <v-img :src="getImageUrl(product.productTitleImage)" aspect-ratio="1.5">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5" />
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-spacer style="height: 50px;"></v-spacer>
    <footer style="text-align: center;">
        <h5> 이용약관 | 유료이용안내 | 개인정보처리방침 |  기업고객  | 문의하기 | 공정위사업자정보 | (주)춘식 </h5>
    </footer>
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
            let products = this.products;

            if (this.selectedCategory !== '전체') {
                products = products.filter(product => product.productCategory === this.selectedCategory);
            }

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                products = products.filter(product => product.productName.toLowerCase().includes(query));
            }

            return products;
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
            categories: ['전체', '귀여운', '재밌는', '메시지'],
            selectedCategory: '전체',
            searchQuery: '', // 검색어를 저장하는 변수
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
    width: 300px;
    /* 원하는 너비로 조정 */
}

.search-input {
    width: 300px;
    /* 원하는 너비로 조정 */
}

.custom-select .v-input__control {
    background-color: #deed933a;
    /* 원하는 배경색으로 변경 */
    color: #a71616;
    /* 원하는 글자색으로 변경 */
}

.custom-select .v-select__selections {
    color: #333;
    /* 선택된 항목의 글자색 변경 */
}

.custom-select .v-label {
    color: #a71616;
    /* 레이블 색상 변경 */
}

.mb-5 {
    background-color: #deed933a
}

.small-icon {
    font-size: 40px;
    /* 원하는 크기로 설정 */
    margin-left: 8px;
    /* 텍스트와 기호 사이에 여백 추가 */
    color: #3f4144;
    /* 원하는 색상으로 변경 */
    vertical-align: middle;
    /* 텍스트와 수평으로 맞춤 */
    position: relative;
    /* 상대적 위치 조정 */
    top: -10px;
    /* 위로 올림 */
    font-weight: 300;
    /* 글자를 얇게 */
    opacity: 0.6;
}
</style>
