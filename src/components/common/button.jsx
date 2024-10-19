import { twMerge } from "tailwind-merge";

const Button = ({ onClick, children, className }) => {
  const baseStyles = "uppercase text-xs text-white bg-horizontal-gradient p-2 rounded-lg w-full hover:opacity-80";

  return (
    <button className={twMerge(baseStyles, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
