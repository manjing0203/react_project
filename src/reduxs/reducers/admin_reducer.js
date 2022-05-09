import {CREATEDELETEUSERINFO} from '../actions_type';

let initState = {
  user:{},
  token:'',
  isLogin:false
}
export default function operaAction(preState=initState,action) {
  let {type} = action;
  let newState
  switch (type) {
    case CREATEDELETEUSERINFO:
      newState = initState;
      return newState;
    default:
      return preState;
  }
}