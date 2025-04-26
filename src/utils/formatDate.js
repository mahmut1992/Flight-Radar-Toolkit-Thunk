const formatDate = (unix_time) => {
  // veri gelmezse null döndür
  if (!unix_time || unix_time === 0) return null;
  // saniye formatındaki veriyi ms formatına ardındanda date formatına çeviriyoruz
  const formatted = new Date(unix_time * 1000);

  return formatted.toLocaleTimeString("tr", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export default formatDate;
