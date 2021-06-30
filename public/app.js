var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  Note on the design of this program: I originally coded this program with multiple react components 
    to handle the rendering of the math buttons and the number buttons with a map to save space and time. 
    The issue with that approach is that it left me unable to easily use CSS Grid. 
    I refactored with Btns and Buttons for ease of use of CSS Grid.
*/
var nums = [{ num: 0,
  name: "zero" }, { num: 1,
  name: "one" }, { num: 2,
  name: "two" }, { num: 3,
  name: "three" }, { num: 4,
  name: "four" }, { num: 5,
  name: "five" }, { num: 6,
  name: "six" }, { num: 7,
  name: "seven" }, { num: 8,
  name: "eight" }, { num: 9,
  name: "nine" }];
var ops = [{ symb: "+",
  name: "add" }, { symb: "-",
  name: "subtract" }, { symb: "*",
  name: "multiply" }, { symb: "/",
  name: "divide" }];

function myIncludes(arr, val, prop) {
  return arr.filter(function (n) {
    return n[prop].toString() == val.trim();
  }).length > 0;
}

var Btn = function (_React$Component) {
  _inherits(Btn, _React$Component);

  function Btn(props) {
    _classCallCheck(this, Btn);

    var _this = _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Btn, [{
    key: "handleClick",
    value: function handleClick() {
      this.props.display(this.props.val);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("input", { type: "button",
        id: this.props.id,
        onClick: this.handleClick,
        className: "buttonClass",
        value: this.props.val });
    }
  }]);

  return Btn;
}(React.Component);

var AllButtons = function (_React$Component2) {
  _inherits(AllButtons, _React$Component2);

  function AllButtons(props) {
    _classCallCheck(this, AllButtons);

    return _possibleConstructorReturn(this, (AllButtons.__proto__ || Object.getPrototypeOf(AllButtons)).call(this, props));
  }

  _createClass(AllButtons, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "allButtons" },
        React.createElement("input", { type: "button", id: "clear", onClick: this.props.clear, className: "buttonClass", value: "AC" }),
        React.createElement(Btn, { id: "divide", val: " / ", display: this.props.display }),
        React.createElement(Btn, { id: "seven", val: "7", display: this.props.display }),
        React.createElement(Btn, { id: "eight", val: "8", display: this.props.display }),
        React.createElement(Btn, { id: "nine", val: "9", display: this.props.display }),
        React.createElement(Btn, { id: "multiply", val: " * ", display: this.props.display }),
        React.createElement(Btn, { id: "four", val: "4", display: this.props.display }),
        React.createElement(Btn, { id: "five", val: "5", display: this.props.display }),
        React.createElement(Btn, { id: "six", val: "6", display: this.props.display }),
        React.createElement(Btn, { id: "subtract", val: " - ", display: this.props.display }),
        React.createElement(Btn, { id: "one", val: "1", display: this.props.display }),
        React.createElement(Btn, { id: "two", val: "2", display: this.props.display }),
        React.createElement(Btn, { id: "three", val: "3", display: this.props.display }),
        React.createElement(Btn, { id: "add", val: " + ", display: this.props.display }),
        React.createElement("input", { type: "button", id: "equals", className: "buttonClass", onClick: this.props.equals, value: "=" }),
        React.createElement("input", { type: "button", id: "decimal", className: "buttonClass", onClick: this.props.decimal, value: "." }),
        React.createElement(Btn, { id: "zero", val: "0", display: this.props.display })
      );
    }
  }]);

  return AllButtons;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this3.state = {
      shortDisplay: "0",
      longDisplay: String.fromCharCode(160),
      answer: String.fromCharCode(160),
      evaluated: false,
      error: String.fromCharCode(160),
      errorClass: "hide",
      prev: false,
      prevMin: false
    };

    _this3.handleClear = _this3.handleClear.bind(_this3);
    _this3.handleDecimal = _this3.handleDecimal.bind(_this3);
    _this3.handleEquals = _this3.handleEquals.bind(_this3);
    _this3.updateDisplay = _this3.updateDisplay.bind(_this3);
    _this3.handleError = _this3.handleError.bind(_this3);
    return _this3;
  }

  _createClass(App, [{
    key: "handleClear",
    value: function handleClear() {
      this.setState({
        shortDisplay: "0",
        longDisplay: String.fromCharCode(160),
        answer: String.fromCharCode(160),
        evaluated: false,
        prev: false,
        prevMin: false
      });
    }
  }, {
    key: "handleDecimal",
    value: function handleDecimal() {
      if (this.state.shortDisplay.includes(".")) {} else {
        this.setState({
          shortDisplay: this.state.shortDisplay + ".",
          longDisplay: this.state.longDisplay + "."
        });
      }
    }
  }, {
    key: "handleEquals",
    value: function handleEquals() {
      if (this.state.longDisplay == String.fromCharCode(160)) {
        return;
      }
      var first = this.state.longDisplay.trim().charAt(0);
      if (myIncludes(ops, first, "symb") && first != "-") {
        this.handleError("You cannot begin an expression like that.");
      } else if (myIncludes(ops, this.state.shortDisplay.trim(), "symb")) {
        this.handleError("You cannot end an expression like that.");
      } else {
        var ans = Number(eval(this.state.longDisplay).toFixed(4)).toString();
        this.setState(function (state) {
          return {
            shortDisplay: "0",
            longDisplay: String.fromCharCode(160),
            answer: ans,
            evaluated: true
          };
        });
      }
    }

    /* 
       If you're reading this comment, I'm sorry that I used eval. 
       I assumed that since there is no user input other than buttons, 
       it would be safe. Sorry if I'm wrong.
    */

  }, {
    key: "updateDisplay",
    value: function updateDisplay(num) {
      //handle length
      if (this.state.longDisplay.length > 25 || this.state.longDisplay.length >= 24 && myIncludes(ops, num, "symb")) {
        return;
      }
      //handle restarting with just a math symbol
      if (this.state.evaluated && myIncludes(ops, num, "symb")) {
        this.setState({
          shortDisplay: num,
          longDisplay: this.state.answer + " " + num,
          answer: String.fromCharCode(160),
          evaluated: false });
        return;
      }

      //handle starting 0's
      if (this.state.shortDisplay === "0" && num === "0") {
        return;
      }

      //handle multiple math symbols

      if (myIncludes(ops, num, "symb")) {
        if (this.state.prev) {
          if (this.state.prevMin) {
            var reg = /(\d+)(?!.*\d)/;
            var newS = this.state.longDisplay.search(reg);
            this.setState({
              longDisplay: this.state.longDisplay.substring(0, newS + 1) + num,
              shortDisplay: num
            });
            return;
          } else if (num.trim() != "-") {
            var newStr = this.state.longDisplay.trim().slice(0, -2) + num;
            this.setState({
              longDisplay: newStr,
              shortDisplay: num
            });
            return;
          } else {
            this.setState({
              prevMin: true,
              prev: true
            });
          }
        } else {
          this.setState({
            prevMin: num.trim() == "-",
            prev: true
          });
        }
      } else {
        this.setState({
          prev: false,
          prevMin: false
        });
      }

      //handle fractions
      if (myIncludes(nums, num, "num") && this.state.shortDisplay !== "0") {
        this.setState({
          longDisplay: this.state.longDisplay += num,
          shortDisplay: this.state.shortDisplay += num,
          evaluated: false
        });
      } else {
        this.setState({
          longDisplay: this.state.longDisplay += num,
          shortDisplay: num,
          evaluated: false
        });
      }
    }
  }, {
    key: "handleError",
    value: function handleError(string) {
      var _this4 = this;

      this.handleClear();
      this.setState({
        error: string,
        errorClass: "show"
      });
      setTimeout(function () {
        _this4.setState({
          errorClass: "hide"
        });
      }, 5000);
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { id: "mainDiv" },
        React.createElement(
          "div",
          { id: "longDis" },
          React.createElement(
            "p",
            null,
            this.state.longDisplay
          )
        ),
        React.createElement(
          "div",
          { id: "display" },
          React.createElement(
            "p",
            null,
            this.state.evaluated ? this.state.answer : this.state.shortDisplay
          )
        ),
        React.createElement(AllButtons, {
          clear: this.handleClear,
          display: this.updateDisplay,
          decimal: this.handleDecimal,
          equals: this.handleEquals
        }),
        React.createElement(
          "p",
          { id: "errorP", className: this.state.errorClass },
          this.state.error
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("App"));