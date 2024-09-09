const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary-blue border-t-transparent"></div>
    </div>
  );
};

export default Loader;
