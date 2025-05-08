import { Card, Tree } from "antd";
import AntIcons from "../../../utils/AntIcons";

type Props = {
  size?: "small"| "middle" | "large";
  style?: any;
  className?: string;
  defaultValue?: string | number | any;
  width?: number;
  onSelect?: any;
  value?: any;
  treeData: any;
  defaultExpandAll?: boolean;
};

const SharedTree = (props: Props) => {
  // Custom switcher icon renderer
  const customSwitcherIcon = (props: any) => {
    if (props.expanded) {
      return AntIcons("MinusSquareIcon")();
    }
    if (props.isLeaf) {
      return null; // No icon for leaf nodes
    }
    return AntIcons("PlusSquareIcon")();
  };

  return (
    <>
      <Tree
            treeData={props.treeData}
            showLine
            switcherIcon={customSwitcherIcon}
            onSelect={props.onSelect}
            defaultExpandAll={props.defaultExpandAll}
            // onExpand={handleExpand}
            // expandedKeys={expandedKeys}
            // selectedKeys={selectedKeys}
          />
    </>
  );
};

export default SharedTree;
