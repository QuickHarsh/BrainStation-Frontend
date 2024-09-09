import { twMerge } from "tailwind-merge";

const Logo = ({ className }) => {
  return (
    <div className={twMerge("flex items-center", className)}>
      <img src="/assets/images/logo.png" className="w-11" alt="BrainStation Logo" />
      <p className="text-2xl font-josfin-sans font-bold">
        Brain<span className="font-jura font-light">Station</span>
      </p>
    </div>
  );
};

export default Logo;
