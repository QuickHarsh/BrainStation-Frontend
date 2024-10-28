import { useEffect, useMemo, useState } from "react";

// A function to wrap your promise and manage its state
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    }
  };
}

// The custom hook adjusted for Suspense and to accept dynamic arguments
const useFetchData = (fetchFunction, args) => {
  const [resource, setResource] = useState();

  // Memoize arguments so that useEffect only runs when the arguments actually change
  const memoizedArgs = useMemo(() => args, [JSON.stringify(args)]); // Serialize args to avoid continuous re-renders

  useEffect(() => {
    const fetchData = async () => {
      const promise = fetchFunction(memoizedArgs);
      console.log(promise);
      const wrappedPromise = wrapPromise(promise);
      setResource(wrappedPromise);
    };

    fetchData();
  }, [fetchFunction, memoizedArgs]);

  return resource ? resource.read() : null;
};

export default useFetchData;
