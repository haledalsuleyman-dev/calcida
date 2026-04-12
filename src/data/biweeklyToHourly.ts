export const biweeklyToHourlyData = Array.from({ length: 39 }, (_, i) => {
  const biweekly = 500 + i * 250;
  return {
    biweekly,
    slug: `${biweekly}-every-two-weeks-is-how-much-an-hour`,
  };
});
