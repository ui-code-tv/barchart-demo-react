import React , {useState,useEffect} from 'react';
import './App.css';

//Expenses for the month
const data = [
  { name: "Phone", expense: 151 },
  { name: "Electricity", expense: 100 },
  { name: "Car", expense: 5 },
  { name: "House", expense: 43 },
  { name: "Food", expense: 56 },
  { name: "Leisure", expense: 182 }
];

function App() {

  const [expensesData, setExpensesData] = useState(data);
  const maxExpense = 200;
  const chartHeight = maxExpense + 20;
  const barWidth = 50;
  const barMargin = 30;
  const numberofBars = expensesData.length;
  let width = numberofBars * (barWidth + barMargin);
  
  // Calculate highest expense for the month
  const calculateHighestExpense = (data) => data.reduce((acc, cur) => {
    const { expense } = cur;
    return expense > acc ? expense : acc;    
  }, 0);

  const [highestExpense, setHighestExpense] = useState(
    calculateHighestExpense(data));

  useEffect(() => {
    console.log(JSON.stringify(expensesData));
    console.log(highestExpense);
  });

  const createRandomData = (data) => data.map((exp) => ({
    name: exp.name,
    expense: Math.floor(Math.random() * maxExpense)
  }))
  let refreshChart = ()=> {
    const newData = createRandomData(expensesData);
    const newHighestexpense = calculateHighestExpense(newData);
    setExpensesData(newData);
    setHighestExpense(newHighestexpense);    
  }

  return (
    <>
      <p className="legend">
        <span className="expense">Expense</span>
        <span className="highest-expense">Highest expense</span>
      </p>

      <Chart height={chartHeight} width={width}>
      {expensesData.map((data, index) => {
        const barHeight = data.expense;
        return (
          <Bar
          key={data.name}
          x={index * (barWidth + barMargin)}
          y={chartHeight - barHeight}
          width={barWidth}
          height={barHeight}
          expenseName={data.name}
          highestExpense={highestExpense}
          />
        );
      })}
      </Chart> 

      <button onClick={refreshChart}>Refresh Chart</button>
    </>
  );
}

const Chart = ({ children, width, height }) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}   
    width="100%"
    height="70%"
    preserveAspectRatio="xMidYMax meet"
  >
    {children}
  </svg>
);

const Bar = ({ x, y, width, height, expenseName,highestExpense }) => (
    <>
      <rect x={x} y={y} width={width} height={height} fill={ highestExpense===height ?`purple`:`black`} /> 
      <text x={x + width / 3} y={y - 5}>
         {highestExpense===height ? `${expenseName}: ${height}` : `${height}`}
      </text>
    </>
  );


export default App;








