import { Card, NavTab } from "components/atoms";
import React from "react";
import styles from "./PopupMenu.module.scss";

export interface IPopupMenuProps {
  isOpen: boolean;
  tabs: { label: string; onClick(): void }[];
  close: () => coid;
}

const PopupMenu = (props: IPopupMenuProps) => {
  const { isOpen, tabs, close } = props;
  //   const [tab, setTab] = useState<number>(0);
  if (isOpen)
    return (
      <>
        <div
          className={styles["closer"]}
          onClick={close}
          onKeyPress={close}
          role="button"
          tabIndex={0}
        >
          <Card className={styles["container"]}>
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
            {/* <Text className={styles["paragraph"]}>Accaunt</Text> */}
          </Card>
        </div>
      </>
    );
  return <></>;
};

export default PopupMenu;
