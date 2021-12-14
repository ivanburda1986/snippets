import React from "react";
import styles from "./Message.module.css";
import { message } from "../../config/config";

export function Message({ type, text }: message) {
  const [mgsClasses, setMsgClasses] = React.useState([styles.Message, styles[`Message-${type}`]]);
  const [hide, setHide] = React.useState(false);
  React.useEffect(() => {
    setTimeout(function () {
      setMsgClasses(mgsClasses.concat(styles.Disappear));
    }, 2500);
    setTimeout(function () {
      setHide(true);
    }, 7500);
  }, []);

  return (
    <div className={mgsClasses.join(" ")} style={{ display: `${hide ? "none" : "flex"}` }}>
      <p>{text}</p>
    </div>
  );
}
