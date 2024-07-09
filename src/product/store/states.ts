export interface ProductState {
    products: Product[]
    recommendProductList: Product[]
    product: Product | null
}

export interface Product {
    productId: number
    productName: string
    productPrice: number
    writer: string
    content: string
    productCategory: string
    productTitleImage: string
    productContentImage: string
    regDate: string
    updDate: string
}

const state: ProductState = {
    products: [],
    recommendProductList: [],
    product: null,
}

export default state