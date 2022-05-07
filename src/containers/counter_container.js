import Counter from '../components/counter';
import { connect } from 'react-redux';
import {incrementAction,decrementAction,incrementAsyncAction} from '../redux/actions/action_creators';

export default connect(
  state =>({count:state.count,person:state.person}),
  {
    increment:incrementAction,
    decrement:decrementAction,
    incrementAsync:incrementAsyncAction
  }
)(Counter);
