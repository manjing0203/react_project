import Counter from '../components/counter';
import { connect } from 'react-redux';
import {incrementAction,decrementAction,incrementAsyncAction} from '../redux/action_creators';

export default connect(
  state =>({count:state}),
  {
    increment:incrementAction,
    decrement:decrementAction,
    incrementAsync:incrementAsyncAction
  }
)(Counter);
