import { Card, NavTab } from "components/atoms";
import React, { useEffect, useRef } from "react";
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
      document.addEventListener("click", handleClose);
      document.removeEventListener("click", handleClose);
    }
    return () => {
      flag = false;
      document.removeEventListener("click", handleClose);
    };
  }, [isOpen]);
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
