import { Tree } from "antd";
import AntIcons from "../../../utils/AntIcons";

type Props = {
  onSelect?: any;
  treeData: any;
  defaultExpandAll?: boolean;
  showIcon?: boolean;
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
        showIcon={props.showIcon}
      />
    </>
  );
};

export default SharedTree;
