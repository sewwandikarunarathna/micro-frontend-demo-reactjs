import Icon from "@ant-design/icons";

type Props = {
  size?: number;
  className?: string;
  onClick?: any;
  component: any;
};

const SharedIcon = (props: Props) => {
  return (
    <>
      <Icon
        className={props.className}
        size={props.size}
        onClick={props.onClick}
        component={props.component}
      />
    </>
  );
};

export default SharedIcon;
