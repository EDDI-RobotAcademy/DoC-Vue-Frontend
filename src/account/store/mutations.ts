import { MutationTree } from "vuex";
import { AccountState, Account } from "./states";
import { REQUEST_NICKNAME_TO_DJANGO, REQUEST_ROLETYPE_TO_DJANGO } from "./mutation-types"

export interface AccountMutations extends MutationTree<AccountState> {
    [REQUEST_NICKNAME_TO_DJANGO] (state: AccountState, receivedData: Account): void
    [REQUEST_ROLETYPE_TO_DJANGO] (state: AccountState, receivedData: Account): void
}

const mutations: MutationTree<AccountState> = {
    [REQUEST_NICKNAME_TO_DJANGO] (state: AccountState, receivedData: Account): void {
        state.account = receivedData
    },
    [REQUEST_ROLETYPE_TO_DJANGO] (state: AccountState, receivedData: Account): void {
        state.account = receivedData
    }
}

export default mutations as AccountMutations