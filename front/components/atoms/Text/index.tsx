import styles from "./Text.module.scss";

export interface TextProps {
  children: string | string[];
  // children: any;
  // children: string | React.ReactChildren;
  variant:
    | "header"
    | "title"
    | "subtitle"
    | "body"
    | "body2"
    | "small"
    | "button";
  className?: string;
}

const Text = (props: TextProps) => {
  const { children, variant, className } = props;
  return (
    <p className={`${styles[`text-${variant}`]} ${className}`}>{children}</p>
  );
};

Text.defaultProps = {
  variant: "body",
};

export default Text;
