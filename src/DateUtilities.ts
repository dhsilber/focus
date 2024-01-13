import { DayMilliseconds, MinuteMilliseconds } from "./Constants"

const commonDayStart = (date: Date) => {
    const nowYear = date.getFullYear()
    const nowMonthIndex = date.getMonth()
    const nowMonthDay = date.getDate()
    const nowTimeZoneOffset = date.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay) + nowTimeZoneOffset
    return dayStart
}

export const dayNowStartMilliseconds = () => {
    const now = new Date()
    return commonDayStart(now)
}

export const dayTimestampStartMilliseconds = (timestamp: number) => {
    const date = new Date(timestamp)
    return commonDayStart(date)
}

export const weekStartMilliseconds = (): number[] => {
    const weekStarts: number[] = []
    const now = new Date()
    let dayStart = commonDayStart(now)
    const today = new Date().getDay()
    for (let day = today; day >= 0; day--, dayStart -= DayMilliseconds) {
        weekStarts[day] = dayStart
    }
    for (let day = 6; day > today; day--, dayStart -= DayMilliseconds) {
        weekStarts[day] = dayStart
    }

    return weekStarts
}

export const datestampToMinute = (): number => {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonthIndex = now.getMonth()
    const nowMonthDay = now.getDate()
    const nowHour = now.getHours()
    const nowMinute = now.getMinutes()
    const nowTimeZoneOffset = now.getTimezoneOffset() * MinuteMilliseconds
    const dayStart = Date.UTC(nowYear, nowMonthIndex, nowMonthDay, nowHour, nowMinute) + nowTimeZoneOffset
    return dayStart
}

export const formatDate = (dateTime: Date) => {
    const year = dateTime.getFullYear() + ''
    const month = (dateTime.getMonth() + 1) + ''
    const date = dateTime.getDate() + ''
    const hours = dateTime.getHours() + ''
    const minutes = dateTime.getMinutes() + ''

    const dateString = `${year}`
        + `-${month.padStart(2, '0')}`
        + `-${date.padStart(2, '0')}`
        + ` ${hours.padStart(2, '0')}`
        + `:${minutes.padStart(2, '0')}`
    return dateString
}

export const humanTimeToMillisecondsSinceMidnight = (humanTime: number) => {
    if (humanTime > 2400) return humanTime

    const hours = Math.trunc( humanTime / 100 )
    const minutes = humanTime % 100

return (hours * 60 + minutes) * MinuteMilliseconds
}
