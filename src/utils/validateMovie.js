export const allowedFormats = ['DVD', 'VHS', 'Blu-Ray'];

export const validateMovie = ({ title, year, format, actors }) => {
  if (!title || title.trim().length < 2) {
    return 'Назва має містити щонайменше 2 символи.';
  }

  const yearNum = Number(year);
  if (!yearNum || yearNum < 1850 || yearNum > 2021) {
    return 'Рік повинен бути в діапазоні 1850–2021.';
  }

  if (!format || !allowedFormats.includes(format)) {
    return 'Оберіть правильний формат фільму.';
  }

  const actorsList = typeof actors === 'string'
    ? actors.split(',').map((actor) => actor.trim()).filter(Boolean)
    : actors;
  

  if (!Array.isArray(actorsList) || actorsList.length === 0) {
    return 'Має бути хоча б один актор.';
  }

  if (actorsList.some(actor => actor.length < 2)) {
    return "Ім'я кожного актора має містити щонайменше 2 символи.";
  }

  return null; 
};