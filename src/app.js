/*
  Note on the design of this program: I originally coded this program with multiple react components to handle the rendering of the math buttons and the number buttons with a map to save space and time. The issue with that approach is that it left me unable to easily use CSS Grid. I refactored with Btns and Buttons for ease of use of CSS Grid.
*/
let nums = [{num: 0,
            name: "zero"},
            {num: 1,
            name: "one"},
            {num: 2,
            name: "two"},
            {num: 3,
            name: "three"},
            {num: 4,
            name: "four"},
            {num: 5,
            name: "five"},
            {num: 6,
            name: "six"},
            {num: 7,
            name: "seven"},
            {num: 8,
            name: "eight"},
            {num: 9,
            name: "nine"},
           ];
let ops = [{symb: "+",
            name: "add"},
           {symb:"-",
            name:"subtract"},
           {symb: "*",
            name: "multiply"},
           {symb: "/",
            name: "divide"}];



function myIncludes(arr, val, prop){
  return arr.filter(n => n[prop].toString() == val.trim()).length>0;
}



class Btn extends React.Component{
  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }
  
  handleClick(){
    this.props.display(this.props.val);
  }
  
  render(){
    return(
      <button
        id={this.props.id}
        onClick={this.handleClick}
        className="buttonClass"
        >{this.props.val}</button>
        )
  }
}


class AllButtons extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <div id="allButtons">
        <button id="clear" onClick={this.props.clear} className="buttonClass">AC</button>
        <Btn id="divide" val=" / " display={this.props.display}/> 
        <Btn id="seven" val="7" display={this.props.display}/> 
        <Btn id="eight" val="8" display={this.props.display}/> 
        <Btn id="nine" val="9" display={this.props.display}/> 
        <Btn id="multiply" val=" * " display={this.props.display}/>
        <Btn id="four" val="4" display={this.props.display}/> 
        <Btn id="five" val="5" display={this.props.display}/> 
        <Btn id="six" val="6" display={this.props.display}/> 
        <Btn id="subtract" val=" - " display={this.props.display}/> 
        <Btn id="one" val="1" display={this.props.display}/> 
        <Btn id="two" val="2" display={this.props.display}/> 
        <Btn id="three" val="3" display={this.props.display}/> 
        <Btn id="add" val=" + " display={this.props.display}/>
        <button id="equals" onClick={this.props.equals}>=</button> 
        <button id="decimal" onClick={this.props.decimal}>.</button>  
        <Btn id="zero" val="0" display={this.props.display}/>  
        </div>
        
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      shortDisplay: "0",
      longDisplay: String.fromCharCode(160),
      answer: String.fromCharCode(160),
      evaluated: false,
      error: String.fromCharCode(160),
      errorClass: "hide",
      prev: false,
      prevMin: false
    }

    this.handleClear=this.handleClear.bind(this);
    this.handleDecimal=this.handleDecimal.bind(this);
    this.handleEquals=this.handleEquals.bind(this);
    this.updateDisplay=this.updateDisplay.bind(this);
    this.handleError=this.handleError.bind(this);
}
  
  handleClear(){
    this.setState({
      shortDisplay: "0",
      longDisplay: String.fromCharCode(160),
      answer: String.fromCharCode(160),
      evaluated: false,
      prev: false,
      prevMin: false
    });
  }
  
  handleDecimal(){
    if(this.state.shortDisplay.includes(".")){ 
    }
    else{
      this.setState({
        shortDisplay: this.state.shortDisplay + ".",
        longDisplay: this.state.longDisplay + "."
      })
    }
  }
  
  handleEquals(){
    if(this.state.longDisplay == String.fromCharCode(160)){
      return;
    }
    let first = this.state.longDisplay.trim().charAt(0);
    if(myIncludes(ops, first, "symb") && first != "-"){
      this.handleError("You cannot begin an expression like that.");
    }else if(myIncludes(ops, this.state.shortDisplay.trim(), "symb")){
        this.handleError("You cannot end an expression like that.");   
    }else{
      let ans = Number(eval(this.state.longDisplay).toFixed(4)).toString()
     this.setState((state) => ({ 
       shortDisplay: "0",
       longDisplay: String.fromCharCode(160),
       answer: ans,
       evaluated: true
     }));
    }
  }
  
  /* 
     If you're reading this comment, I'm sorry that I used eval. 
     I assumed that since there is no user input other than buttons, 
     it would be safe. Sorry if I'm wrong.
  */
  
  updateDisplay(num){
    //handle length
    if(this.state.longDisplay.length > 16){
      return;
    }
    //handle restarting with just a math symbol
    if(this.state.evaluated && myIncludes(ops, num, "symb")){
      this.setState({
        shortDisplay: num,
        longDisplay: this.state.answer + " " + num,
        answer: String.fromCharCode(160),
        evaluated: false});
      return;
    }
    
    //handle starting 0's
    if(this.state.shortDisplay === "0" && num === "0"){
      return;
    }
    
    //handle multiple math symbols

    if(myIncludes(ops, num, "symb")){
      if(this.state.prev){
        if(this.state.prevMin){
          let reg = /(\d+)(?!.*\d)/;
          let newS = this.state.longDisplay.search(reg);
          this.setState({
            longDisplay: this.state.longDisplay.substring(0, newS + 1) + num,
            shortDisplay: num
          })
          return;         
        }else if(num.trim() != "-"){
          let newStr = this.state.longDisplay.trim().slice(0, -2) + num;
          this.setState({
            longDisplay: newStr,
            shortDisplay: num
           })
          return;
        }else{
          this.setState({
            prevMin: true,
            prev: true
          })
        }
      }else{
        this.setState({
          prevMin: num.trim() == "-",
          prev: true
        });
      }
    }else{
      this.setState({
        prev: false,
        prevMin: false
      });
    }

    //handle fractions
    if(myIncludes(nums, num, "num") && this.state.shortDisplay !== "0"){
      this.setState({
        longDisplay: this.state.longDisplay += num,
        shortDisplay: this.state.shortDisplay += num,
        evaluated: false
      })
    }else{
      this.setState({
        longDisplay: this.state.longDisplay += num,
        shortDisplay: num,
        evaluated: false
      });
    }
  }

  handleError(string){
      this.handleClear();
      this.setState({
          error: string,
          errorClass: "show"
      })
      setTimeout(() => {
          this.setState({
              errorClass: "hide"
          })
      }, 5000)
  }
  
  render(){
    
    return(
      <div id="mainDiv">
        <div id="longDis">
          <p>{this.state.longDisplay}</p>
        </div>
        <div id="display">
          <p>{this.state.evaluated? this.state.answer: this.state.shortDisplay}</p> 
         </div>
         <AllButtons
           clear={this.handleClear}
           display={this.updateDisplay}
           decimal={this.handleDecimal}
           equals={this.handleEquals}
           />
           <p id="errorP" className={this.state.errorClass}>{this.state.error}</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("App"));


