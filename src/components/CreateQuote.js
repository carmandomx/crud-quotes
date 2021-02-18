import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CreateQuote = ({
  onCreateQuote,
  options,
  resetForm,
  buttonText,
  data = {
    quote: "",
    class: "",
    _id: null,
  },
}) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: data,
  });

  useEffect(() => {
    if (resetForm) {
      reset({
        quote: "Me resetie",
        class: "",
      });
    }
  }, [resetForm, reset]);

  useEffect(() => {
    setValue("_id", data._id);
    setValue("quote", data.quote);
    setValue("class", data.class);
  }, [data, setValue]);

  const onSubmit = (data) => {
    onCreateQuote(data);
  };

  const optionsMap = options.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="_id" ref={register} type="hidden" />
      <label style={{ display: "block", padding: 10 }}>
        <input name="quote" ref={register} placeholder="Quote" />
      </label>
      <label style={{ display: "block", padding: 10 }}>
        <select name="class" ref={register} placeholder="Class">
          <option value="">Select a class</option>
          {optionsMap}
        </select>
      </label>
      <button>{buttonText}!</button>
    </form>
  );
};

export default CreateQuote;
