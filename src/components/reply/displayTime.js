function displayTime(timestamp) {
  const localDate = new Date(timestamp);
  const localTimeString = localDate.toLocaleString()
  const parts = localTimeString.split(' ');

  const dateString = parts[0];
  const timeString = parts[1];

  const dateParts = dateString.split('/');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const timeParts = timeString.split(':');
  const hours = timeParts[0];
  const minutes = parseInt(timeParts[1]);

  const formattedDate = `${year}年${month}月${day}日`;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

  return `${formattedTime}・${formattedDate}`;
}

export {displayTime}