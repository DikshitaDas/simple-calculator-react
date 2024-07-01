function Calculator() {
    // Initialize state with default values for current input, total, initial flag, and previous operator
    const [calc, setCalc] = React.useState({
      current: "0",
      total: "0",
      isInitial: true,
      preOp: "",
    });
  
    // Function to render the current display value
    function renderDisplay() {
      return calc.current;
    }
  
    // Function to handle number button clicks
    function handleNumber(value) {
      let newValue = value;
  
      // Concatenate new number to the current value if not in initial state
      if (!calc.isInitial) {
        newValue = calc.current + value;
      }
  
      // Update state with the new current value, retaining other state properties
      setCalc({
        current: newValue,
        total: calc.total,
        isInitial: false,
        preOp: calc.preOp,
      });
    }
  
    // Function to perform the calculation based on the previous operator
    function doCalculation() {
      let total = parseInt(calc.total);
  
      switch (calc.preOp) {
        case "+":
          total += parseInt(calc.current);
          break;
        case "-":
          total -= parseInt(calc.current);
          break;
        case "*":
          total *= parseInt(calc.current);
          break;
        case "/":
          total /= parseInt(calc.current);
          break;
        default:
          total = parseInt(calc.current);
          break;
      }
  
      return total;
    }
  
    // Function to handle operator button clicks
    function handleOperator(value) {
      if (calc.preOp && calc.preOp !== "=") {
        // Perform calculation if there's a previous operator and it's not equals
        const total = doCalculation();
        setCalc({
          current: total.toString(),
          total: total.toString(),
          isInitial: true,
          preOp: value,
        });
      } else {
        // Set the current value as total if there's no previous operator or it's equals
        setCalc({
          current: calc.current,
          total: calc.current,
          isInitial: true,
          preOp: value,
        });
      }
    }
  
    // Function to handle equals button click
    function handleEquals() {
      const total = doCalculation();
      setCalc({
        current: total.toString(),
        total: total.toString(),
        isInitial: true,
        preOp: "=",
      });
    }
  
    // Function to handle clear button click
    function handleClear() {
      setCalc({
        current: "0",
        total: "0",
        isInitial: true,
        preOp: "",
      });
    }
  
    return (
      <div className="calculator">
        <div className="display">{renderDisplay()}</div>
  
        {/* Number buttons */}
        <CalcButton value="7" onClick={handleNumber} />
        <CalcButton value="8" onClick={handleNumber} />
        <CalcButton value="9" onClick={handleNumber} />
        <CalcButton value="/" className="operator" onClick={handleOperator} />
  
        <CalcButton value="4" onClick={handleNumber} />
        <CalcButton value="5" onClick={handleNumber} />
        <CalcButton value="6" onClick={handleNumber} />
        <CalcButton value="*" className="operator" onClick={handleOperator} />
  
        <CalcButton value="1" onClick={handleNumber} />
        <CalcButton value="2" onClick={handleNumber} />
        <CalcButton value="3" onClick={handleNumber} />
        <CalcButton value="-" className="operator" onClick={handleOperator} />
  
        <CalcButton value="C" onClick={handleClear} />
        <CalcButton value="0" onClick={handleNumber} />
        <CalcButton value="=" onClick={handleEquals} />
        <CalcButton value="+" className="operator" onClick={handleOperator} />
      </div>
    );
  }
  
  // Button component to render each calculator button
  function CalcButton(props) {
    return (
      <button
        className={props.className}
        onClick={() => props.onClick(props.value)}
      >
        {props.value}
      </button>
    );
  }
  
  // Render the Calculator component inside the root element
  ReactDOM.render(
    <div className="app-container">
      <Calculator />
    </div>,
    document.getElementById("root")
  );
  