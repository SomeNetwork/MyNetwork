import { useEffect } from "react";
import styles from "./Div100vh.module.scss";

const Div100vh = (props: {
  children: React.ReactChild | React.ReactChild[];
}) => {
  const { children } = props;
  const wt = typeof window;
  useEffect(() => {
    let flag = true;
    const handleResizeListener = () => {
      if (flag)
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
    };

    if (typeof window !== "undefined") {
      handleResizeListener();
      window.addEventListener("resize", handleResizeListener);
    }
    return () => {
      flag = false;
      window.removeEventListener("resize", handleResizeListener);
    };
  }, [wt]);
  return <div className={styles["container"]}>{children}</div>;
};

export default Div100vh;
