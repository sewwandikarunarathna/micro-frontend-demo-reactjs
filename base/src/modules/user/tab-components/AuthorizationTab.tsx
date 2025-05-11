import React, { useState } from "react";
import SharedSider from "../../../shared-components/organisms/SharedSider";
import AuthorizationTable from "./AuthorizationTable";
import SharedTypography from "../../../shared-components/atoms/SharedTypography";
import SharedSelect from "../../../shared-components/atoms/SharedSelect";
import { DataNode } from "antd/es/tree";
import SharedTree from "../../../shared-components/molecules/SharedTree";
import SharedInput from "../../../shared-components/atoms/SharedInput";
import PerfectScrollbar from "react-perfect-scrollbar";
import AntIcons from "../../../utils/AntIcons";

const AuthorizationTab = () => {
  const treeData = [
    {
      key: "Purchases",
      title: "Purchases",
      icon: AntIcons('CarryOutOutlined')(),
    },
    {
      key: "Sales",
      title: "Sales",
      icon: AntIcons('CarryOutOutlined')(),
      children: [
        {
          key: "Sales-quotation",
          title: "Sales Quotation",
          icon: AntIcons('CarryOutOutlined')(),
          children: [
            {
              key: "Sales-quotation-header",
              title: "Sales Quotation Header",
              icon: AntIcons('CarryOutOutlined')(),
            },
            {
              key: "Sales-quotation-lines",
              title: "Sales Quotation Lines",
              icon: AntIcons('CarryOutOutlined')(),
            },
          ],
        },
        {
          key: "sales-order",
          title: "Sales Order",
          icon: AntIcons('CarryOutOutlined')(),
          children: [
            {
              key: "sales-order-header",
              title: "Sales Order Header",
              icon: AntIcons('CarryOutOutlined')(),
            },
            {
              key: "sales-order-lines",
              title: "Sales Order Lines",
              icon: AntIcons('CarryOutOutlined')(),
            },
          ],
        },
      ],
    },
    {
      key: "ap-invoice",
      title: "Ap Invoice",
      icon: AntIcons('CarryOutOutlined')(),
    },
  ];
  const [treeSelectValue, setTreeSelectValue] = useState<any>(treeData[0].key);
  const [treebarCollapsed, setTreebarCollapsed] = useState<boolean>(false);

  const handleTreeSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const key = selectedKeys[0];

      const node = findNodeByKey(key, treeData);
      if (node) {
        const nodeTitle =
          typeof node.title === "string" ? node.title : "Selected item";
        setTreeSelectValue(nodeTitle);
      }
    }
  };

  // Find the node by key
  const findNodeByKey = (
    key: React.Key,
    nodes: DataNode[]
  ): DataNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = findNodeByKey(key, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="h-auto w-full flex flex-col items-start justify-start px-4 gap-2 ">
        <div className="flex flex-row gap-2 w-full">
          <SharedTypography
            level={2}
            className="font-medium text-2xl text-black"
          >
            Company
          </SharedTypography>
          <div className="text-sm text-yellow-300 font-normal">
            <SharedSelect
              width={200}
              options={[
                { value: "rizer", label: "Rizer" },
                { value: "learner", label: "Learner" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <SharedTypography
            level={2}
            className="font-medium text-2xl text-black"
          >
            Selection
          </SharedTypography>
          <SharedInput
            width={200}
            value={treeSelectValue}
            readOnly
            suffix={AntIcons("DownOutlined")()}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-row w-full gap-3">
        <div className="flex h-56">
          <PerfectScrollbar
            className=""
            onScrollY={() => console.log("helooo")}
          >
            <SharedSider
              collapsed={treebarCollapsed}
              onCollapse={() => setTreebarCollapsed(!treebarCollapsed)}
              //   collapsedWidth={44}
              width={160}
              // breakpoint="lg"
            >
              <SharedTree
                treeData={treeData}
                showIcon
                onSelect={handleTreeSelect}
              />
            </SharedSider>
          </PerfectScrollbar>
        </div>
        {/* table */}
        <AuthorizationTable />
      </div>
    </div>
  );
};

export default AuthorizationTab;
