export interface OrderState {
    orderItemList: OrderItem[]
    orderItem: OrderItem | null
}

export interface OrderItem {
    orderId: number
    productId: number
    cartItemId: number
    quantity: number
    price: number
}

const state: OrderState = {
    orderItemList: [],
    orderItem: null
}

export default state