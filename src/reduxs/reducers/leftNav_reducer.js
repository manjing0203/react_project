import {SAVETITLE} from '../actions_type';

let initState = ''
export default function operaAction(preState=initState,action) {
  let {type,data} = action;
  let newState
  switch (type) {
    case SAVETITLE:
      newState = data;
      return newState;
    default:
      return preState;
  }
}