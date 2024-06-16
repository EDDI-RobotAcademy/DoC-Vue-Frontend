export interface BoardState {
    boardList: Board[]
    board: Board | null
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
    board: null
}

export default state