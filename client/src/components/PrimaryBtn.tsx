import { ReactNode } from "react";

export default function PrimaryBtn({
  children,
  disabled = false,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="disabled:opacity-70 disabled:hover:bg-blue bg-blue hover:bg-blue_hover hover:transition-all ease-in-out text-white p-1 rounded"
    >
      {children}
    </button>
  );
}
