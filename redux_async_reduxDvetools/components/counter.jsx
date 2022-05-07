import React,{Component} from "react";

export default class App extends Component{
  myRef = React.createRef();
  increment = ()=>{
    let {value} = this.myRef.current;
    this.props.increment(value*1);
  }
  decrement = ()=>{
    let {value} = this.myRef.current;
    this.props.decrement(value*1);
  }
  incrementIfOdd = ()=>{
    let {value} = this.myRef.current;
    let {count} = this.props;
    if(count%2 === 1){
      this.props.increment(value*1);
    }
  }
  incrementAsync = ()=>{
    let {value} = this.myRef.current;
    this.props.incrementAsync(value*1,1000);
  }
  render(){
    let {count} = this.props;
    return (
      <div>
        <h3>当前计数为{count}</h3>
        <select name="num" ref={this.myRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button type="button" onClick={this.increment}>+</button>&nbsp;
        <button type="button" onClick={this.decrement}>-</button>&nbsp;
        <button type="button" onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button type="button" onClick={this.incrementAsync}>increment async</button>&nbsp;
      </div>
    )
  }
}
