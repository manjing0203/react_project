import React,{Component} from "react";

export default class App extends Component{
  state = {
    count:0
  };
  myRef = React.createRef();
  increment = ()=>{
    let {count} = this.state
    let {value} = this.myRef.current;
    this.setState({
      count:count+value*1
    })
  }
  decrement = ()=>{
    let {count} = this.state
    let {value} = this.myRef.current;
    this.setState({
      count:count-value*1
    })
  }
  incrementIfOdd = ()=>{
    let {count} = this.state
    let {value} = this.myRef.current;
    if(count%2 === 1){
      this.setState({
        count:count+value*1
      })
    }
  }
  incrementAsync = ()=>{
    let {count} = this.state
    let {value} = this.myRef.current;
    setTimeout(() => {
      this.setState({
        count:count+value*1
      })
    }, 1000);
  }
  render(){
    let {count} = this.state
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
