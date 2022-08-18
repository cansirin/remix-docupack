import React, { FC, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { RemovableInput } from "../RemovableInput";

type InputConfig = {
  id: string;
  value: string;
};

type Props = {
  onChange: (input: string[]) => void;
  inputs?: string[] | null;
};

const emptyInput = (index: number): InputConfig => ({
  id: index.toString(),
  value: "",
});

const generateInputConfig = (values: string[]): InputConfig[] => {
  return values.map((value, index) => {
    return {
      id: index.toString(),
      value,
    };
  });
};

export const InputList: FC<Props> = ({ onChange, inputs }) => {
  const [list, setList] = useState<InputConfig[] | null>([]);

  useEffect(() => {
    let initialInputs: InputConfig[];
    if (!inputs || !inputs.length) {
      initialInputs = [emptyInput(0)];
    } else {
      initialInputs = generateInputConfig(inputs);
    }
    setList(initialInputs);
  }, [inputs]);

  const addMoreInputField = () => {
    const inputFields = [emptyInput(list.length)].concat(list);
    onChange(
      inputFields.map((i) => {
        return i.value;
      })
    );
    setList(inputFields);
  };

  const removeInputField = (id: string) => {
    const inputFields = list.filter((i: InputConfig) => i.id !== id);
    onChange(
      inputFields.map((i) => {
        return i.value;
      })
    );
    if (list.length === 1) return;
    setList(inputFields);
  };

  const handleListChange = (value: string, id: string) => {
    const inputFields = list.map((i) => {
      if (i.id === id) {
        return { ...i, id, value };
      }
      return i;
    });

    onChange(
      inputFields.map((i) => {
        return i.value;
      })
    );
    setList(inputFields);
  };

  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium text-gray-700"
      >
        Item
        <PlusIcon
          className="ml-1 mr-0.5 inline-block h-7 w-7 flex-shrink-0 cursor-pointer self-center text-purple-500"
          onClick={addMoreInputField}
        />
      </label>
      {list.map((i) => {
        return (
          <div className="mt-3 flex rounded-md shadow-sm" key={i.id}>
            <RemovableInput
              label=""
              value={i.value || ""}
              onChange={handleListChange}
              onRemove={removeInputField}
              id={i.id}
              placeholder="Passport, visa..."
            />
          </div>
        );
      })}
    </div>
  );
};
