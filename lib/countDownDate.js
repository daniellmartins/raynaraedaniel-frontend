export function countDownDate(date) {
  const now = new Date().getTime();
  const countDownDate = new Date(date).getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: {
      label: days === 1 ? "Dia" : "Dias",
      value: days <= 9 ? `0${days}` : days
    },
    hours: {
      label: hours === 1 ? "Hora" : "Horas",
      value: hours <= 9 ? `0${hours}` : hours
    },
    minutes: {
      label: minutes === 1 ? "Minuto" : "Minutos",
      value: minutes <= 9 ? `0${minutes}` : minutes
    },
    seconds: {
      label: seconds === 1 ? "Segundo" : "Segundos",
      value: seconds <= 9 ? `0${seconds}` : seconds
    }
  };
}
