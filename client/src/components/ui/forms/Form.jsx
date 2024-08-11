import { Input, Select } from "@chakra-ui/react";

const Form = ({ action, inputs = [], title }) => {
  return (
    <form onSubmit={action} className="card flex flex-col gap-5">
      {title && <h1 className="text text-2xl">{title}</h1>}
      {inputs.map((data, index) => (
        <div key={index}>
          {data.label && <p className="text text-sm">{data.label}</p>}
          {data.type === "select" ? (
            <Select
              size="sm"
              rounded={5}
              value={data.value}
              onChange={data.onChange}
              isInvalid={data.isInvalid}
              focusBorderColor={data.isInvalid ? "#F5E9DD" : "#E85D56"}
              required={data.required}
              placeholder="Select option"
            >
              {data.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              size="sm"
              rounded={5}
              isInvalid={data.isInvalid}
              value={data.value}
              placeholder={data.placeholder || ""}
              type={data.type}
              onChange={data.onChange}
              required={data.required}
              focusBorderColor={data.isInvalid ? "#F5E9DD" : "#E85D56"}
              errorBorderColor="#E85D56"
              color="#F5E9DD"
              _placeholder={{
                opacity: 1,
                color: data.isInvalid ? "#E85D56" : "#F5E9DD",
              }}
            />
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
