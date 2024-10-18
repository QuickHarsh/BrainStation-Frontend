import Scrollbars from "react-custom-scrollbars-2";

const ScrollView = ({ children }) => {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={"calc(100vh - 280px)"}
      thumbMinSize={30}
      universal={true}
      className="rounded-lg"
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollView;
