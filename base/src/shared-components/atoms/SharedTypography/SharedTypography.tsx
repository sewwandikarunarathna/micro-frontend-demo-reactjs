import { Typography } from "antd";

type Props = {
  children: any;
  type?: "secondary" | "success" | "warning" | "danger";
  className?: string;
  href?: string;
  disabled?: boolean;
  underline?: boolean;
  strong?: boolean;
  italic?: boolean;
  isLink?: boolean;
  isTitle?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
};

const { Text, Link, Title } = Typography;

const SharedTypography = (props: Props) => {
  return props.isLink ? (
    <>
      <Link href={props.href} target="_blank">
        {props.children}
      </Link>
    </>
  ) : props.isTitle ? (
    <Title
      disabled={props.disabled}
      underline={props.underline}
      italic={props.italic}
      type={props.type}
      className={`${props.className} m-0`}
      level={props.level}
    >
      {props.children}
    </Title>
  ) : (
    <Text
      disabled={props.disabled}
      underline={props.underline}
      strong={props.strong}
      italic={props.italic}
      type={props.type}
      className={props.className}
    >
      {props.children}
    </Text>
  );
};

export default SharedTypography;
