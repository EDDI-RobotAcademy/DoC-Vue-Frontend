import actions, { NotificationActions } from "./actions"
import mutations, { NotificationMutations } from "./mutations"
import state, { NotificationState } from "./states"

export interface NotificationModule {
    namespaced: true
    state: NotificationState
    actions: NotificationActions
    mutations: NotificationMutations
}

const notificationModule: NotificationModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default notificationModule