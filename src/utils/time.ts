import { Slice } from '@prisma/client';

export const convertTimeToNum = (time: string) => {
  const hour = time.split(':')[0];
  const minutes = time.split(':')[1];

  if (!hour || !minutes) throw new Error('Time provided is not valid: xx:xx');

  const hourInt = parseInt(hour);

  if (minutes === '00') return hourInt;

  return hourInt + parseFloat(minutes) / 60;
};

export const convertNumToTime = (num: number) => {
  return num.toString().padStart(2, '0') + ':00';
};

export const sortByStartTime = (a: Slice, b: Slice) => {
  const aNum = convertTimeToNum(a.start);
  const bNum = convertTimeToNum(b.start);

  if (aNum < bNum) return -1;
  if (aNum > bNum) return 1;

  return 0;
};

export const validateSliceTime = (
  currentSlice: { start: string; end: string },
  slices: Array<Slice>,
) => {
  return slices.find((slice) => {
    if (
      convertTimeToNum(currentSlice.start) < convertTimeToNum(slice.end) &&
      convertTimeToNum(currentSlice.end) > convertTimeToNum(slice.start)
    ) {
      return true;
    }

    return false;
  });
};
