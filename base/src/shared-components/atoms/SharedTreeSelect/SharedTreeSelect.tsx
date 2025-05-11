import { TreeSelect } from "antd";

type Props = {
  size?: "small"| "middle" | "large";
  width?: number;
  value?: any;
  treeData: any;
  showTreeIcon: boolean;
  showLeafIcon: boolean;
  treeLine: boolean;
  disabled: boolean;
};


const SharedTreeSelect = (props: Props) => {
  return (
    <>
    <TreeSelect
    value={props.value}
      disabled={props.disabled}
      size={props.size ?? "small"}
      treeLine={props.treeLine && { showLeafIcon: props.showLeafIcon }}
        style={{ width: props.width ?? 300 }}
        treeData={props.treeData}
        treeIcon={props.showTreeIcon}
      />
    </>
  );
};

export default SharedTreeSelect;
