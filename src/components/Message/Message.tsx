import React, { useContext } from "react";
import styles from "./Message.module.css";
import { AppContext } from "../../context/context";
import { typeMessage } from "../../config/config";

export function Message({ type, text, queuePosition, id }: typeMessage) {
  const [mgsClasses, setMsgClasses] = React.useState([styles.Message, styles[`Message-${type}`]]);
  const [hide, setHide] = React.useState(false);
  const mycontext = useContext(AppContext);
  React.useEffect(() => {
    setTimeout(function () {
      setMsgClasses(mgsClasses.concat(styles.Disappear));
    }, 2500);
    setTimeout(function () {
      mycontext.removeSnackbarMessage(id);
      setHide(true);
    }, 7500);
  }, []);

  return (
    <div className={mgsClasses.join(" ")} style={{ display: `${hide ? "none" : "flex"}`, bottom: `calc(10vh + ${queuePosition * 55}px)` }}>
      <p>{text}</p>
    </div>
  );
}
