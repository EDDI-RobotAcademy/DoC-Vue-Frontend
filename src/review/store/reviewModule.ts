import actions, { ReviewActions } from "./actions"
import mutations, { ReviewMutations } from "./mutations"
import state, { ReviewState } from "./states"

export interface ReviewModule {
    namespaced: true
    state: ReviewState
    actions: ReviewActions
    mutations: ReviewMutations
}

const reviewModule: ReviewModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default reviewModule