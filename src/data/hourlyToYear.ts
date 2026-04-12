export const hourlyToYearData = Array.from({ length: 191 }, (_, i) => {
  const hourly = 10 + i;
  return {
    hourly,
    slug: `${hourly}-an-hour-is-how-much-a-year`,
  };
});

export const formatUSD = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatUSD2 = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
};
