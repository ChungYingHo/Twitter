function displayTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}年${month}月${day}日`;
  const formattedTime = `${hours < 12 ? '上午' : '下午'}${hours % 12}:${minutes.toString().padStart(2, '0')}`;

  return `${formattedTime}・${formattedDate}`;
}

export {displayTime}