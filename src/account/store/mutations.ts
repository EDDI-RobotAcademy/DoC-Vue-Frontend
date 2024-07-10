import { MutationTree } from "vuex";
import { AccountState } from "./states";
import { REQUEST_NICKNAME_TO_DJANGO, 
         REQUEST_ROLETYPE_TO_DJANGO,
         REQUEST_CORRECT_ADMIN_PASSWORD_TO_DJANGO,
         REQUEST_RECOMMNED_PRODUCT_ID_LIST_TO_DJANGO
         } from "./mutation-types"

export interface AccountMutations extends MutationTree<AccountState> {
    [REQUEST_NICKNAME_TO_DJANGO] (state: AccountState, receivedData: string): void
    [REQUEST_ROLETYPE_TO_DJANGO] (state: AccountState, receivedData: string): void
    [REQUEST_CORRECT_ADMIN_PASSWORD_TO_DJANGO] (state: AccountState, receivedData: string): void
    [REQUEST_RECOMMNED_PRODUCT_ID_LIST_TO_DJANGO] (state: AccountState, receivedData: []): void
}

const mutations: MutationTree<AccountState> = {
    [REQUEST_NICKNAME_TO_DJANGO] (state: AccountState, receivedData: string): void {
        state.nickname = receivedData
    },
    [REQUEST_ROLETYPE_TO_DJANGO] (state: AccountState, receivedData: string): void {
        state.roleType = receivedData
    },
    [REQUEST_CORRECT_ADMIN_PASSWORD_TO_DJANGO] (state: AccountState, receivedData: string): void {
        state.correctAdminPassword = receivedData
    },
    [REQUEST_RECOMMNED_PRODUCT_ID_LIST_TO_DJANGO] (state: AccountState, receivedData: []): void {
        state.recommendProductIdList = receivedData
    }
}

export default mutations as AccountMutations