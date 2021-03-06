import Input from "components/atoms/Input/Input";
import { FieldValues, Path } from "react-hook-form";
import { ISelectProps } from "types/componentTypes";

const Select = <T extends FieldValues>({ field, register }: ISelectProps<T>) => {
  return (
    <Input
      as={"select"}
      {...field}
      defaultValue=""
      {...register(field.name as Path<T>, { required: true })}
    >
      <option value="" disabled>
        {field.label}
      </option>
      {field?.selectOptions?.map(({ value, content }) => {
        if (!value) {
          return null;
        }
        return (
          <option key={value + content} value={value}>
            {content || value}
          </option>
        );
      })}
    </Input>
  );
};
export default Select;
