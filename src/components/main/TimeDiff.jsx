import { useState, useEffect } from "react";

export default function TimeDiff({ timestamp }) {
  const [timeDiff, setTimeDiff] = useState('');

  const calculateTimeDiff = (timestamp) => {
    const recordTime = new Date(timestamp);
    const currentTime = new Date();
    const diffMilliseconds = currentTime - recordTime;
    const seconds = Math.floor(diffMilliseconds / 1000);

    if (seconds < 60) {
      return `少於 1 分鐘`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} 分鐘`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} 小時`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} 天`;
    }
  };

  useEffect(() => {
    // 設定一個定時器來改變時間顯示
    const interval = setInterval(() => {
      const newTimeDiff = calculateTimeDiff(timestamp);
      setTimeDiff(newTimeDiff);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timestamp]);

  return <span>{timeDiff}</span>;
}