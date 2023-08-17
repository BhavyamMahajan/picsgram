import { ReactNode } from "react";
import { LoadingSpinner } from "../../public/Icons";

export default function PrimaryBtn({
  children,
  disabled = false,
  isLoading = false,
}: {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="disabled:opacity-70 disabled:hover:bg-blue bg-blue hover:bg-blue_hover hover:transition-all ease-in-out text-white p-1 rounded"
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
