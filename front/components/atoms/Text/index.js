import styles from "./Text.module.scss";
import PropTypes from "prop-types";

const Text = (props) => {
  const { children, variant } = props;
  return <p className={styles[`text-${variant || "body"}`]}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    "header",
    "title",
    "subtitle",
    "body",
    "body2",
    "button",
  ]),
};

export default Text;
