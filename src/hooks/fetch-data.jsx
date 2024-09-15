import { useEffect } from "react";
import { useState } from "react";

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

// The custom hook adjusted for Suspense
const useFetchData = (fetchFunction) => {
  // This state will hold the wrapped promise and its status
  const [resource, setResource] = useState();

  useEffect(() => {
    // Immediately invoke the fetch function and wrap the promise
    const promise = fetchFunction();
    const wrappedPromise = wrapPromise(promise);
    setResource(wrappedPromise);
  }, [fetchFunction]);

  // The resource object has a read method that Suspense can use
  return resource ? resource.read() : null;
};

export default useFetchData;
