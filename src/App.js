import "./App.css";
import Quote from "./components/Quote";
import { useEffect, useState } from "react";
import CreateQuote from "./components/CreateQuote";
import axios from "axios";
function App() {
  const [quotes, setQuotes] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newQuote, setNewQuote] = useState(null);
  const [resetForm, setResetForm] = useState(false);
  const [quoteToUpdate, setQuoteToUpdate] = useState(null);
  const [quoteToUpdateForRealsies, setQuoteToUpdateForRealsies] = useState(
    null
  );
  // Traer las options
  useEffect(() => {
    const res = axios({
      url: `https://prof-quotes.herokuapp.com/api/quotes/options`,
      method: "GET",
    });

    res.then((response) => {
      setClassOptions(response.data.classOptions);
    });
  }, []);

  // GET
  useEffect(() => {
    // llamar quotes
    const res = axios.get(`https://prof-quotes.herokuapp.com/api/quotes`);
    res.then((response) => {
      setQuotes(response.data.quotes);
    });
  }, []);

  // DELETE
  useEffect(() => {
    if (idToDelete) {
      const res = axios.delete(
        `https://prof-quotes.herokuapp.com/api/quotes/${idToDelete}`
      );
      res.then(() => {
        setQuotes((prevState) =>
          prevState.filter((value) => value._id !== idToDelete)
        );
      });
    }

    return () => {
      setIdToDelete(null);
    };
  }, [idToDelete]);

  // POST
  useEffect(() => {
    if (newQuote) {
      // const res = axios.post("/quotes", newQuote, {
      //   baseURL: "https://prof-quotes.herokuapp.com/api",
      // });

      const res = axios({
        url: "https://prof-quotes.herokuapp.com/api/quotes",
        data: newQuote,
        method: "POST",
      });

      res.then((response) => {
        // Usando el valor anterior para calcular un valor nuevo
        setQuotes((miEstate) => [response.data, ...miEstate]);
        setResetForm(true);
        // Pasamos un valor nuevo
        // setQuotes([...response.data, ...quotes]);
      });
    }
  }, [newQuote]);

  // PUT

  useEffect(() => {
    if (quoteToUpdateForRealsies) {
      const res = axios.put(
        `https://prof-quotes.herokuapp.com/api/quotes/${quoteToUpdateForRealsies._id}`,
        quoteToUpdateForRealsies
      );

      res.then((response) => {
        setQuotes((miEstate) =>
          miEstate.map((quote) => {
            if (quote._id !== response.data._id) {
              return quote;
            }

            return {
              ...response.data,
            };
          })
        );
      });
      setQuoteToUpdate(null);
    }
  }, [quoteToUpdateForRealsies]);

  const handleCreateQuote = (data) => {
    setNewQuote(data);
  };

  const handleDeleteQuote = (id) => {
    setIdToDelete(id);
  };

  const handleUpdateQuote = (quote) => {
    setQuoteToUpdate(quote);
  };

  const handleUpdateQuoteForRealsies = (quote) => {
    console.log(quote);
    setQuoteToUpdateForRealsies(quote);
  };

  return (
    <div className="App">
      {quoteToUpdate ? (
        <CreateQuote
          resetForm={resetForm}
          onCreateQuote={handleUpdateQuoteForRealsies}
          options={classOptions}
          data={quoteToUpdate}
          buttonText="Update"
        />
      ) : (
        <CreateQuote
          resetForm={resetForm}
          onCreateQuote={handleCreateQuote}
          options={classOptions}
          buttonText="Create"
        />
      )}
      {quotes.map((value) => (
        <Quote
          key={value._id}
          text={value.quote}
          classProp={value.class}
          id={value._id}
          onDeleteQuote={handleDeleteQuote}
          onUpdateQuote={handleUpdateQuote}
        />
      ))}
    </div>
  );
}

export default App;
