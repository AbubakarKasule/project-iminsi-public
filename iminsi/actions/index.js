// import all actions and action types from various action files

import {
  ActionTypes as articleActionTypes,
  getArticle,
  getArticles,
  incrementScore,
  decrementScore,
  getArticles
} from './article';

import {
  ActionTypes as userActionTypes,
  signUpUser,
  signInUser,
  updateUser,
  getInterests,
  getOrganizations,
  getUserArticles
} from './user';

import {
  getInterests,
} from './interest';

// combine all action types
const ActionTypes = {};


Object.keys(articleActionTypes).forEach((key) => {
  ActionTypes[key] = articleActionTypes[key];
});


Object.keys(userActionTypes).forEach((key) => {
  ActionTypes[key] = userActionTypes[key];
});

// export all action types in one object, as well as each action
export {
  ActionTypes,
  getArticle,
  getArticles,
  incrementScore,
  decrementScore,
  signUpUser,
  signInUser,
  updateUser,
  getInterests,
<<<<<<< HEAD
  getOrganizations,
  getUserArticles
=======
>>>>>>> onboarding
};
