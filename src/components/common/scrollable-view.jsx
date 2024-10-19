import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

const ScrollView = ({ children, initialMaxHeight = "280px" }) => {
  const [maxHeight, setMaxHeight] = useState(initialMaxHeight);

  useEffect(() => {
    const updateHeight = () => {
      const dynamicHeight = `calc(${window.innerHeight}px - ${initialMaxHeight})`;
      setMaxHeight(dynamicHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [initialMaxHeight]);

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={maxHeight}
      thumbMinSize={30}
      universal={true}
      className="rounded-lg"
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollView;
