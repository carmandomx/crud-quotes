const Quote = ({ text, classProp, onDeleteQuote, id, onUpdateQuote }) => {
  return (
    <div style={{ marginTop: 8 }}>
      Charlie said: {text} at {classProp}{" "}
      <button onClick={() => onDeleteQuote(id)}>Delete!</button>
      <button
        onClick={() =>
          onUpdateQuote({
            quote: text,
            class: classProp,
            _id: id,
          })
        }
      >
        Update!
      </button>
    </div>
  );
};

export default Quote;
