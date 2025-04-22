import { Card } from "antd";

type Props = {
  children: any;
  variant?: "borderless" | "outlined" | any;
  size?: "small" | "default";
  style?: any;
  className?: string;
  title?: string;
  width?: number;
  onClick?: any;
};

const SharedCard = (props: Props) => {
  return (
    <>
      <Card className={props.className} size={props.size ?? 'small'} title={props.title} variant={props.variant} style={{ width: props.width ?? 300 }}>
        {props.children}
      </Card>
    </>
  );
};

export default SharedCard;
