export const convertTimeToNum = (time: string) => {
  const hour = time.split(':')[0];
  const minutes = time.split(':')[1];

  if (!hour || !minutes) throw new Error('Time provided is not valid: xx:xx');

  const hourInt = parseInt(hour);

  if (minutes === '00') return hourInt;

  return hourInt + parseFloat(minutes) / 60;
};
