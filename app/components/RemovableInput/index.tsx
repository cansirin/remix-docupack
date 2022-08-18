import React, { ChangeEvent, FC } from "react";
import { MinusCircleIcon } from "@heroicons/react/solid";
import { Input } from "../Input";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string, id: string) => void;
  onRemove?: (id: string) => void;
  id?: string;
};

export const RemovableInput: FC<Props> = ({
  label,
  id,
  value,
  placeholder,
  onChange,
  onRemove,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, id);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div>
      <label
        htmlFor="templateName"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <Input
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          value={value}
        />
        <MinusCircleIcon
          className="ml-1 mr-0.5 inline-block h-7 w-7 flex-shrink-0 cursor-pointer self-center text-purple-500"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};
