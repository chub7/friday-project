export const parseData = (backData: string) => {
    let date = new Date(backData)
    let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${day}.${month}.${date.getFullYear()}`
}