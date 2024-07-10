export interface AccountState {
    isLoggedIn: boolean
    isAdmin: boolean
    nickname: string
    roleType: string
    correctAdminPassword: string,
    recommendProductIdList: [],
}

const state: AccountState = {
    isLoggedIn: false,
    isAdmin: false,
    nickname: '',
    roleType: '',
    correctAdminPassword: '',
    recommendProductIdList: []
}

export default state