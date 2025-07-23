export const allowedFormats = ['DVD', 'VHS', 'Blu-Ray'];

export const validateMovie = ({ title, year, format, actors }) => {
  if (!title || !title.trim()) return 'Назва обовʼязкова';

  const yearNum = Number(year);
  if (!yearNum || yearNum < 1850 || yearNum > 2030)
    return 'Рік повинен бути в діапазоні 1850–2030';

  if (!format || !allowedFormats.includes(format)) 
    return 'Оберіть правильний формат фільму';

  const actorsList = typeof actors === 'string'
    ? actors.split(',').map((a) => a.trim()).filter(Boolean)
    : actors;

  if (!Array.isArray(actorsList) || actorsList.length === 0)
    return 'Має бути хоча б один актор';

  return null; 
};