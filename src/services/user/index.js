// Mock data
import users from 'data/users';
import monitorUsers from 'data/monitorUsers';
import topProfiles from 'data/TopProfiles';

export const getUsers = (limit = 10) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const usersLookup = users.slice(0, limit);

      resolve({
        users: usersLookup,
        usersTotal: users.length
      });
    }, 700);
  });
};

export const getUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);

      if (user) {
        resolve({
          // user: lookupUser(user)
        });
      } else {
        reject({
          error: 'User not found'
        });
      }
    }, 500);
  });
};


export const getMonitorUsers = (limit = 6) => {
  return new Promise(resolve => {
    const usersLookup = JSON.parse(JSON.stringify(monitorUsers))
        .slice(0, limit);

    setTimeout(() => {
      resolve({
        users: usersLookup
      });
    }, 700);
  });
};

export const getTopProfiles = (limit = 6, type) => {
    return new Promise(resolve => {
        const usersLookup = JSON.parse(JSON.stringify(topProfiles))
            .slice(0, limit);

        setTimeout(() => {
            resolve({
                users: usersLookup
            });
        }, 700);
    });
};