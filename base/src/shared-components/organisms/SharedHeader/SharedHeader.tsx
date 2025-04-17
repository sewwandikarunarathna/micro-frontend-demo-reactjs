import { Layout } from "antd";
import SharedMenu from "../../molecules/SharedMenu";

const { Header } = Layout;

type Props = {
  children?: any;
  className?: string;
};

const SharedHeader = (props: Props) => {
  return (
    <>
      <Header className={props.className}>{props.children}</Header>
    </>
  );
};

export default SharedHeader;
