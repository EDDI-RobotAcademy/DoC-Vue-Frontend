export interface NotificationState {
    expectedSecedeList: ExpectedSecede[]
}

export interface ExpectedSecede {
    accountId: number
    email: string
    lastOrderdDate: string
}

const state: NotificationState = {
    expectedSecedeList: [],
}

export default state