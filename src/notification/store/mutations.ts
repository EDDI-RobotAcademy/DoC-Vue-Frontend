import { MutationTree } from "vuex";
import { ExpectedSecede, NotificationState } from "./states";
import { REQUEST_EXPECTED_SECEDE_LIST_TO_DJANGO } from "./mutation-types";

export interface NotificationMutations extends MutationTree<NotificationState> {
    [REQUEST_EXPECTED_SECEDE_LIST_TO_DJANGO] (state: NotificationState, receivedData: ExpectedSecede[]): void
}

const mutations: MutationTree<NotificationState> = {
    [REQUEST_EXPECTED_SECEDE_LIST_TO_DJANGO] (state: NotificationState, receivedData: ExpectedSecede[]): void {
        state.expectedSecedeList = receivedData},
}

export default mutations as NotificationMutations