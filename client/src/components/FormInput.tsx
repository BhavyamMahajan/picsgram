import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  stateName: string;
  setState: Dispatch<SetStateAction<string>>;
  labelName: string;
  type: string;
  required?: boolean;
  setShowPassword?: any;
  showPassword?: boolean;
  svg?: ReactNode;
};

export default function FormInput({
  stateName,
  setState,
  labelName,
  type,
  required = false,
  showPassword = false,
  setShowPassword,
  svg,
}: Props) {
  return (
    <label className="relative flex items-center border border-black rounded">
      <input
        type={showPassword ? "text" : type}
        value={stateName}
        required={required}
        className={
          stateName
            ? "w-full bg-transparent px-2 pt-4 pb-1 text-grey-500 text-xs focus:outline-none"
            : "w-full bg-transparent px-2 py-2.5 text-grey-500 text-xs focus:outline-none"
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
            : "absolute left-2.5 top-1.5 text-gray-400 transition-all ease-out cursor-text"
        }
      >
        {labelName}
      </span>

      <span
        className="cursor-pointer pr-1"
        onClick={() => setShowPassword(!showPassword)}
      >
        {svg}
      </span>
    </label>
  );
}
