export interface AccountState {
    isLoggedIn: boolean
    account: Account | null
}

export interface Account {
    nickname: string,
    roleType: string,
}

const state: AccountState = {
    isLoggedIn: false,
    account: null
}

export default state