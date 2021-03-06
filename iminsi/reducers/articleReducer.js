/* eslint-disable prefer-object-spread */
import { ActionTypes } from '../actions/index';

const initialState = {
  articles: [],
  currArticle: {},
  verified: [],
};

const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES:
      return Object.assign({}, state, {
        articles: action.payload.data,
      });
      // return { ...state, articles: action.payload.data };
    case ActionTypes.GET_VERIFIED:
      return Object.assign({}, state, {
        verified: action.payload,
      });
    case ActionTypes.GET_ARTICLE:
      return { ...state, currArticle: action.payload.data };
    case ActionTypes.INCREMENT_SCORE || ActionTypes.DECREMENT_SCORE:
      return { ...state, currArticle: action.payload.data };
    case ActionTypes.API_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default ArticleReducer;
