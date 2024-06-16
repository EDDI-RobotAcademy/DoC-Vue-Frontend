export interface BoardState {
    boardList: Board[]
}

export interface Board {
    boardId: number
    boardTitle: string
    boardWriter: string
    boardContent: string
    boardRegDate: string
    boardUpdDate: string
}

const state: BoardState = {
    boardList: [],
}

export default state