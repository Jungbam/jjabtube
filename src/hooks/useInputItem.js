import React, { useState } from "react";

const useInputItem = () => {
  const [input, setInput] = useState({
    title: "",
    content: 0,
    tag: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const reset = () => {
    setInput({
      title: "",
      content: 0,
      tag: "",
    });
  };
  return { input, setInput, onChangeHandler, reset };
};

export default useInputItem;
