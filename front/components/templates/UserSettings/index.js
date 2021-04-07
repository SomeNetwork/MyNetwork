import { Card, NavTab } from "components/atoms";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./UserSettings.module.scss";
import { tabs } from "./formsConfig";
import { Tab0, Tab1, Tab2, Tab3 } from "./TabsScreens";

const UserSettings = (props) => {
  const { user } = props;
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className={styles["container"]}>
      <div className={styles["settings-container"]}>
        <Card className={styles["settings-left"]}>
          {tabs.map((label, idx) => (
            <NavTab
              key={idx}
              type="tab"
              variant="left"
              onClick={() => setTab(idx)}
              active={tab === idx}
            >
              {label}
            </NavTab>
          ))}
          {/* <Text className={styles["paragraph"]}>Accaunt</Text> */}
        </Card>

        <div className={styles["settings-right"]}>
          {tab === 0 && <Tab0 user={user} />}
          {tab === 1 && <Tab1 user={user} />}
          {tab === 2 && <Tab2 user={user} />}
          {tab === 3 && <Tab3 user={user} />}
        </div>
      </div>
    </div>
  );
};
UserSettings.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    family_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // online: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
  }),
};
UserSettings.defaultProps = {
  // isOwner: false,
  // isLoaded: false,
  user: {},
};
export default UserSettings;
