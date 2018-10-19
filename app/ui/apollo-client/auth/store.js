
const onChangeCallbacks = [];

let tokenStore = {
  async set({ userId, token, tokenExpires }) {
    global.localStorage['Meteor.userId'] = userId;
    global.localStorage['Meteor.loginToken'] = token;
    global.localStorage['Meteor.loginTokenExpires'] = tokenExpires.toString();
  },
  async get() {
    return {
      userId: global.localStorage['Meteor.userId'],
      token: global.localStorage['Meteor.loginToken'],
      tokenExpires: global.localStorage['Meteor.loginTokenExpires'],
    };
  },
};


export const onTokenChange = (callback) => {
  onChangeCallbacks.push(callback);
};

const tokenDidChange = async () => {
  const newData = await tokenStore.get();
  onChangeCallbacks.forEach(callback => callback(newData));
};

export const setTokenStore = (newStore) => {
  tokenStore = newStore;
};

export const storeLoginToken = async (userId, token, tokenExpires) => {
  await tokenStore.set({ userId, token, tokenExpires });
  await tokenDidChange();
};

export const getLoginToken = async () => {
  const { token } = await tokenStore.get();
  return token;
};

export const getUserId = async () => {
  const { userId } = await tokenStore.get();
  return userId;
};

export const resetStore = async () => {
  await storeLoginToken('', '', '');
};
