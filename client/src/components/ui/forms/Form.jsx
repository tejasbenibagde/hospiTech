import { Input } from "@chakra-ui/react";

const Form = ({ action, inputs = [] }) => {
  return (
    <form onSubmit={action} className="card flex flex-col gap-5">
      {inputs.map((data) => {
        return (
          <div>
            {data.label && <p className="text">{data.label}</p>}
            <Input
              isInvalid={data.isInvalid}
              key={data.name}
              value={data.value}
              placeholder={data.placeholder}
              name={data.name}
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
          </div>
        );
      })}
    </form>
  );
};

export default Form;
