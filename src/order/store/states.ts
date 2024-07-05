export interface OrderState {
    orderItemList: OrderItem[]
    orderItem: OrderItem | null
    orderList: Order[]
    order: Order | null 
}

export interface OrderItem {
    orderItemId: number
    productId: number
    cartItemId: number
    quantity: number
    price: number
}

export interface Order {
    orderId: number
    orderData: string,
    totalPrice: number,
    totalQuantity: number,
}

const state: OrderState = {
    orderItemList: [],
    orderItem: null,
    orderList: [],
    order: null,
}

export default state