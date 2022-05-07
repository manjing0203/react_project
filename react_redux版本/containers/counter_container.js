import Counter from '../components/counter';
import { connect } from 'react-redux';
import {incrementAction,decrementAction} from '../redux/action_creators';

// function mapStateToProps(state) {
//   return {
//     count:state
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return{
//     increment:(value)=>{dispatch(incrementAction(value))},
//     decrement:(value)=>{dispatch(decrementAction(value))},
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter);

//精简写法
export default connect(
  state =>({count:state}),
  {
    increment:incrementAction,
    decrement:decrementAction
  }
)(Counter);
