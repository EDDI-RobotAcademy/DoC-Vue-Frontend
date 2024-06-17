<template>
    <v-container>
        <h2>판매 상품 리스트</h2>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ name: 'ProductRegisterPage' }">
               상품 등록
            </router-link>
        </div>
            <v-row v-if="products.length > 0">
                <v-col v-for="(product, index) in products" :key="index">
                    
                        <v-img :src="getImageUrl(product.productImage)" aspect-ratio="1" color="grey lighten-2">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"/>
                                </v-row>
                            </template>
                        </v-img>
                        <v-card-title>{{product.productName}}</v-card-title>
                        <v-card-subtitle>{{product.productPrice}}</v-card-subtitle> 
            
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" class="text-center">
                    <v-alert type="info">등록된 상품이 없습니다!</v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-img src='@/assets/images/fixed/fiximg.png' aspect-ratio="1" color="grey lighten-2">
                    <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"/>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
    </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'

const productModule = 'productModule'

export default {
components: {
    // RouterLink
},
computed: {
    ...mapState(productModule, ['products']),
    pagedItems () {
        const startIdx = (this.pagination.page - 1) * this.perPage
        const endIdx = startIdx + this.perPage
        return this.products.slice(startIdx, endIdx)
    }
},
mounted () {
    this.requestProductListToDjango()
},
methods: {
    ...mapActions(productModule, ['requestProductListToDjango']),

    getImageUrl (imageName) {
        return require(`@/assets/images/uploadimages/${imageName}`)
    },
    goToProductReadPage () {
        console.log('읽기 구현할 때 사용 예정')
    },
    readRow (event, { item }) {
        this.$router.push({
            name: 'ProductReadPage',
            params: { productId: item['productId'].toString() }
        })
    }
},
data () {
    return {
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
        }
    }
}
}
</script>