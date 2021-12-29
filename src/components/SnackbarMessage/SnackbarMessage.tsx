import React, { useContext } from "react";
import styles from "./SnackbarMessage.module.css";
import { AppContext } from "../../context/context";
import { typeMessage } from "../../config/config";

export const SnackbarMessage: React.FC<typeMessage> = ({ type, text, queuePosition, id }) => {
  const [mgsClasses, setMsgClasses] = React.useState([styles.SnackbarMessage, styles[`SnackbarMessage-${type}`]]);
  const [hide, setHide] = React.useState(false);
  const mycontext = useContext(AppContext);
  React.useEffect(() => {
    setTimeout(function () {
      setMsgClasses(mgsClasses.concat(styles.Disappear));
    }, 3000);
    setTimeout(function () {
      mycontext.removeSnackbarMessage(id);
      setHide(true);
    }, 4000);
  }, []);

  return (
    <div className={mgsClasses.join(" ")} style={{ display: `${hide ? "none" : "flex"}`, bottom: `calc(10vh + ${queuePosition * 55}px)` }}>
      <p>{text}</p>
    </div>
  );
};
