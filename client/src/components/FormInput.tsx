import { Dispatch, SetStateAction } from "react";

type Props = {
  stateName: string;
  setState: Dispatch<SetStateAction<string>>;
  labelName: string;
  type: string;
  required?: boolean;
};

export default function FormInput({
  stateName,
  setState,
  labelName,
  type,
  required = false,
}: Props) {
  return (
    <label className="relative">
      <input
        type={type}
        value={stateName}
        required={required}
        className={
          stateName
            ? "w-full bg-gray-100 border border-grey rounded px-2 pt-4 pb-1 text-grey-500 text-xs focus:outline-none"
            : "w-full bg-gray-100 border border-grey rounded px-2 py-2.5 text-grey-500 text-xs focus:outline-none"
        }
        onChange={(e) =>
          setState(
            type === "password" ? e.target.value : e.target.value.toLowerCase()
          )
        }
      />
      <span
        className={
          stateName
            ? "absolute left-2 top-0.5 text-gray-400 text-xs transition-all ease-out"
            : "absolute left-2.5 top-2 text-gray-400 transition-all ease-out cursor-text"
        }
      >
        {labelName}
      </span>
    </label>
  );
}
