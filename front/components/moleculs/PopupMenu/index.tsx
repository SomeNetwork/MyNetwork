import { Card, NavTab } from "components/atoms";
import React, { useEffect } from "react";
import styles from "./PopupMenu.module.scss";

export interface IPopupMenuProps {
  isOpen: boolean;
  tabs: { label: string; onClick(): void }[];
  close: () => void;
  anchorEl: HTMLElement | null;
}

const PopupMenu = (props: IPopupMenuProps) => {
  const { isOpen, tabs, close, anchorEl } = props;
  //   const [tab, setTab] = useState<number>(0);
  // const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let flag = true;
    const handleClose = () => flag && close();
    if (isOpen) {
      // document.removeEventListener("click", handleClose);
      // console.log("removed", flag);
      document.addEventListener("click", handleClose);
      console.log("added", flag);
    }
    return () => {
      document.removeEventListener("click", handleClose);
      flag = false;
      console.log("removed", flag);
    };
  }, [isOpen, close]);
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);
  useEffect(() => {
    console.log("updated tabs");
  }, [tabs]);
  useEffect(() => {
    console.log("updated isOpen");
  }, [isOpen]);
  useEffect(() => {
    console.log("updated close");
  }, [close]);
  useEffect(() => {
    console.log("updated anchorEl");
  }, [anchorEl]);
  if (isOpen)
    return (
      <Card
        className={styles["menu"]}
        style={{
          top: (anchorEl?.offsetTop || 0) + (anchorEl?.clientHeight || 0),
          left: anchorEl?.offsetLeft || 0,
        }}
      >
        {tabs.map(({ label, onClick }, idx) => (
          <NavTab
            key={idx}
            type="tab"
            variant="left"
            onClick={onClick}
            //   active={tab === idx}
          >
            {label}
          </NavTab>
        ))}
      </Card>
    );
  return <div></div>;
};

export default PopupMenu;
