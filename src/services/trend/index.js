// Mock data
import trends from 'data/trends';
import users from 'data/users';

function lookupTrend(trend) {
  trend.customer = users.find(user => user.id === trend.customer);

  return trend;
}

export const getTrends = (limit = 6) => {
  return new Promise(resolve => {
    const trendsLookup = JSON.parse(JSON.stringify(trends))
      .slice(0, limit);

    setTimeout(() => {
      resolve({
        trends: trendsLookup,
        trendsTotal: trends.length
      });
    }, 700);
  });
};
