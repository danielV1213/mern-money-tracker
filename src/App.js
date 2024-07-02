import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const addNewTransaction = (value) => {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    fetch(url, {
      method: "POST",
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(value),
    }).then(response => {
      response.json().then((jsonData) => {
        console.log(jsonData);
      });
    });
  };

  return (
    <main>
      {/* Title */}
      <h1>
        $400<span>.00</span>
      </h1>
      {/* Title end */}

      {/* Form for adding transactions */}
      <form onSubmit={handleSubmit(addNewTransaction)}>
        <div className='basics'>
          <input
            required
            {...register("name")}
            type='text'
            placeholder='+200 new Samsung TV'
          />
          <input required {...register("dateTime")} type='datetime-local' />
        </div>
        <div className='description'>
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
        {/* Single transaction container */}
        <div className='transaction'>
          <div className='left'>
            <div className='name'>New Samsung TV</div>
            <div className='description'>it was time for a new TV.</div>
          </div>
          <div className='right'>
            <div className='price red'>-$500</div>
            <div className='datetime'>2024-05-20 19:25</div>
          </div>
        </div>
        {/* Single transaction container end */}

        {/* Single transaction container */}
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Gig job new website</div>
            <div className='description'>it was time for a new TV.</div>
          </div>
          <div className='right'>
            <div className='price green'>+$500</div>
            <div className='datetime'>2024-05-20 19:25</div>
          </div>
        </div>
        {/* Single transaction container end */}

        {/* Single transaction container */}
        <div className='transaction'>
          <div className='left'>
            <div className='name'>iPhone</div>
            <div className='description'>it was time for a new TV.</div>
          </div>
          <div className='right'>
            <div className='price red'>-$900</div>
            <div className='datetime'>2024-05-20 19:25</div>
          </div>
        </div>
        {/* Single transaction container end */}
      </div>
      {/* General transactions container end */}
    </main>
  );
}

export default App;
