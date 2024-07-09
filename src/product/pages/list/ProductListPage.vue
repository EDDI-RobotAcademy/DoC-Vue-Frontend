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
        <h1 @click="toggleVisibility('recommendationVisible')">추천 이모티콘<span class="small-icon">></span></h1>
        <v-row v-if="recommendationVisible && filteredProducts.length > 0">
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
        <v-row v-else-if="recommendationVisible">
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>
        <v-spacer class="my-10"></v-spacer>
        <h1 @click="toggleVisibility('cuteVisible')">귀여운 이모티콘<span class="small-icon">></span></h1>
        <v-row v-if="cuteVisible && filteredCuteProducts.length > 0">
            <v-col v-for="(product, index) in filteredCuteProducts" :key="index" cols="12" sm="6" md="4" lg="3">
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
        <v-row v-else-if="cuteVisible">
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>
        <v-spacer class="my-10"></v-spacer>
        <h1 @click="toggleVisibility('funnyVisible')">재밌는 이모티콘<span class="small-icon">></span></h1>
        <v-row v-if="funnyVisible && filteredFunnyProducts.length > 0">
            <v-col v-for="(product, index) in filteredFunnyProducts" :key="index" cols="12" sm="6" md="4" lg="3">
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
        <v-row v-else-if="funnyVisible">
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>

        <v-spacer class="my-10"></v-spacer>
        <h1 @click="toggleVisibility('messageVisible')">메시지 이모티콘<span class="small-icon">></span></h1>
        <v-row v-if="messageVisible && filteredMessageProducts.length > 0">
            <v-col v-for="(product, index) in filteredMessageProducts" :key="index" cols="12" sm="6" md="4" lg="3">
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
        <v-row v-else-if="messageVisible">
            <v-col cols="12" class="text-center">
                <v-alert type="info">등록된 상품이 없습니다!</v-alert>
            </v-col>
        </v-row>

        <v-spacer class="my-10"></v-spacer>

        <footer style="text-align: center;">
            <h5> 이용약관 | 유료이용안내 | 개인정보처리방침 | 기업고객 | 문의하기 | 공정위사업자정보 | (주)춘식 </h5>
        </footer>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'
const accountModule = 'accountModule'

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
        },
        filteredCuteProducts() {
            return this.products.filter(product => product.productCategory === '귀여운');
        },
        filteredFunnyProducts() {
            return this.products.filter(product => product.productCategory === '재밌는');
        },
        filteredMessageProducts() {
            return this.products.filter(product => product.productCategory === '메시지');
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
        },
        toggleVisibility(section) {
            this[section] = !this[section];
        }
    },
    data() {
        return {
            categories: ['전체', '귀여운', '재밌는', '메시지'],
            selectedCategory: '전체',
            searchQuery: '', // 검색어를 저장하는 변수
            isSeller: false, // 판매자 여부를 저장하는 상태 변수
            recommendationVisible: true,
            cuteVisible: true,
            funnyVisible: true,
            messageVisible: true
        }
    }
}
</script>

<style>
.category-select {
    width: 300px;
}

.search-input {
    width: 300px;
}

.custom-select .v-input__control {
    background-color: #f4f6eb3a;
    color: #a71616;
}

.custom-select .v-select__selections {
    color: #333;
}

.custom-select .v-label {
    color: #a71616;
}

.mb-5 {
    background-color: #deed933a;
}

.small-icon {
    font-size: 40px;
    margin-left: 8px;
    color: #3f4144;
    vertical-align: middle;
    position: relative;
    top: -10px;
    font-weight: 300;
    opacity: 0.6;
}
</style>
