import { useState } from "react";

export const useForm = (initialObjet) => {
  const [form, setForm] = useState(initialObjet);

  const changed = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    changed,
  };
};
