import { useState, useEffect } from "react";

export default function TimeDiff({ timestamp }){
    const [timeDiff, setTimeDiff] = useState('')

    useEffect(() => {
        const recordTime = new Date(timestamp)
        const currentTime = new Date()
        const diffMilliseconds = currentTime - recordTime
        const seconds = Math.floor(diffMilliseconds / 1000)

        if (seconds < 60) {
        setTimeDiff(`${seconds} 秒`)
        } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeDiff(`${minutes} 分鐘`)
        } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setTimeDiff(`${hours} 小時`)
        } else {
        const days = Math.floor(seconds / 86400);
        setTimeDiff(`${days} 天`)
        }
    }, [timestamp])

    return <span>{timeDiff}</span>
}