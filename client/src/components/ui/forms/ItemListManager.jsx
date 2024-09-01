import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

const ItemListManager = ({ items, setItems, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setItems(...items, inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="flex gap-2.5">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          size="sm"
          rounded={5}
          focusBorderColor="#E85D56"
          errorBorderColor="#E85D56"
          color="#F5E9DD"
          _placeholder={{
            opacity: 1,
            color: "#F5E9DD",
          }}
        />
        <Button
          onClick={handleFormSubmit}
          size="sm"
          rounded={5}
          bg="#E85D56"
          color="#F5E9DD"
          _hover={{ bg: "#D4554A" }}
        >
          Add
        </Button>
      </div>
      <div className="mt-2">
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <h1 className="text">{item}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

const MultiItemListManager = ({ form, add }) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        {form.map((data, index) => (
          <div key={index}>
            {data.label && <p className="text text-sm">{data.label}</p>}
            <Input
              type={data.type}
              name={data.name}
              value={data.value}
              onChange={data.onChange}
              placeholder={data.placeholder}
              size="sm"
              rounded={5}
              focusBorderColor="#E85D56"
              errorBorderColor="#E85D56"
              color="#F5E9DD"
              _placeholder={{
                opacity: 1,
                color: "#F5E9DD",
              }}
            />
          </div>
        ))}
        <Button onClick={add}>Add</Button>{" "}
      </div>
    </div>
  );
};

export default MultiItemListManager;

export { ItemListManager, MultiItemListManager };
