export const monthlyToHourlyData = Array.from({ length: 77 }, (_, i) => {
  const monthly = 1000 + i * 250;
  return {
    monthly,
    slug: `${monthly}-a-month-is-how-much-an-hour`,
  };
});
