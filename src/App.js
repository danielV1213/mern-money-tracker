import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions().then(setTransactions);
  }, []);

  const getAllTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  };

  const addNewTransaction = (value) => {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(value),
    }).then((response) => {
      response.json().then((jsonData) => {
        reset();
        getAllTransactions().then(setTransactions);
      });
    });
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];

  return (
    <main>
      {/* Title */}
      <h1>
        ${balance}
        <span>.{fraction}</span>
      </h1>
      {/* Title end */}

      {/* Form for adding transactions */}
      <form onSubmit={handleSubmit(addNewTransaction)}>
        <div className='basics'>
          {/* Transaction name and price */}
          <input
            required
            {...register("name")}
            type='text'
            placeholder='New Samsung TV'
          />
          <input
            required
            {...register("price")}
            type='number'
            placeholder='+200'
          />
        </div>
        <div className='details'>
          {/* Datetime and description */}
          <input required {...register("dateTime")} type='datetime-local' />
          <input
            required
            {...register("description")}
            type='text'
            placeholder='description'
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      {/* Form for adding transactions end */}

      {/* General transactions container */}
      <div className='transactions'>
        {transactions.length > 0 &&
          transactions.map((transaction, transactionKey) => (
            // Single transaction container
            <div key={transactionKey} className='transaction'>
              <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
              </div>
              <div className='right'>
                <div
                  className={`price ${transaction.price > 0 ? "green" : "red"}`}
                >
                  ${transaction.price}
                </div>
                <div className='datetime'>{transaction.dateTime}</div>
              </div>
            </div>
            // Single transaction container end
          ))}
      </div>
      {/* General transactions container end */}
    </main>
  );
}

export default App;
