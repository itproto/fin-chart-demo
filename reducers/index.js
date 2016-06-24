import { combineReducers } from 'redux';

import {
  REQUEST_DATA, 
  RECEIVE_DATA, 
  SELECT_STOCK
} from '../actions';

const initState = {
  selectedData: [],
  data: {
    stocks: []
  }
};

const clone = (src, props)  => {
  return Object.assign({}, src, props); 
};

export default (state=initState, action) => {
  switch(action.type){
    case REQUEST_DATA:
      return clone(state, {
          isFetching: true
      });
    case RECEIVE_DATA:
      return clone(state, {
        data: action.data, 
        isFetching:false
      });
    case SELECT_STOCK:
      const selectedData = state.data.data.filter(d => {
        return d.stock === action.stock;
      });
      
      return clone(state, {
         selectedData,
         selectedStock: action.stock
      });
    default:
      return state;
  }
};
