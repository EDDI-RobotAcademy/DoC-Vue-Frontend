export interface ReportState {
    reportList: Report[]
    report: Report | null
}

export interface Report {
    writer: string
    age: number
    gender: string
}

const state: ReportState = {
    reportList: [],
    report: null
}

export default state