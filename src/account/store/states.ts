export interface AccountState {
    isLoggedIn: boolean
    isAdmin: boolean
    nickname: string
    roleType: string
    correctAdminPassword: string,
}

const state: AccountState = {
    isLoggedIn: false,
    isAdmin: false,
    nickname: '',
    roleType: '',
    correctAdminPassword: '',
}

export default state