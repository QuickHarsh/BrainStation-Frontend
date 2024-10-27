const LockIcon = ({ size = 5, color = "black" }) => {
  const sizeMap = {
    2: "12px", // w-2, h-2
    3: "14px", // w-3, h-3
    4: "16px", // w-4, h-4
    5: "20px", // w-5, h-5
    6: "24px", // w-6, h-6
    7: "28px", // Custom size
    8: "32px" // w-8, h-8
  };

  const actualSize = sizeMap[size] || "20px"; // Fallback to 20px if size is not in map

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={color} width={actualSize} height={actualSize} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default LockIcon;
