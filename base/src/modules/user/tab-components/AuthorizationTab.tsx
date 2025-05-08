import React, { useState } from "react";
import SharedSider from "../../../shared-components/organisms/SharedSider";
import SharedMenu from "../../../shared-components/molecules/SharedMenu";
import AuthorizationTable from "./AuthorizationTable";
import SharedTypography from "../../../shared-components/atoms/SharedTypography";
import SharedSelect from "../../../shared-components/atoms/SharedSelect";
import SharedTreeSelect from "../../../shared-components/atoms/SharedTreeSelect";
import { CarryOutOutlined, DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import SharedTree from "../../../shared-components/molecules/SharedTree";

const AuthorizationTab = () => {
    const treeData = [
      {
        key: "Purchases",
        title: "Purchases",
        icon: <CarryOutOutlined />,
      },
      {
        key: "Sales",
        title: "Sales",
        icon: <CarryOutOutlined />,
        children: [
          {
            key: "Sales-quotation",
            title: "Sales Quotation",
            icon: <CarryOutOutlined />,
            children: [
              {
                key: "Sales-quotation-header",
                title: "Sales Quotation Header",
                icon: <CarryOutOutlined />,
              },
              {
                key: "Sales-quotation-lines",
                title: "Sales Quotation Lines",
                icon: <CarryOutOutlined />,
              },
            ],
          },
          {
            key: "sales-order",
            title: "Sales Order",
            icon: <CarryOutOutlined />,
            children: [
              {
                key: "sales-order-header",
                title: "Sales Order Header",
                icon: <CarryOutOutlined />,
              },
              {
                key: "sales-order-lines",
                title: "Sales Order Lines",
                icon: <CarryOutOutlined />,
              },
            ],
          },
        ],
      },
      {
        key: "ap-invoice",
        title: "Aap Invoice",
        icon: <CarryOutOutlined />,
      },
    ];
    const [treeSelectValue, setTreeSelectValue] = useState<any>(treeData[0].key);
    const [treebarCollapsed, setTreebarCollapsed] = useState<boolean>(false);

  const handleTreeSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
        const key = selectedKeys[0];
        
        const node = findNodeByKey(key, treeData);
        if (node) {            
          const nodeTitle = typeof node.title === 'string' ? node.title : 'Selected item';
          setTreeSelectValue(nodeTitle);
        }
      }
  };

    // Find the node by key
    const findNodeByKey = (key: React.Key, nodes: DataNode[]): DataNode | null => {
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
    <div className="flex flex-col gap-2 overflow-x-auto md:overflow-x-hidden">
      <div className="h-auto w-full flex flex-col items-start justify-start px-4 gap-2 ">
        <div className="flex flex-row gap-2 w-full">
          <SharedTypography level={2} className="font-bold text-2xl text-black">
            Company
          </SharedTypography>
          <SharedSelect
          className="text-sm text-yellow-300 font-normal"
            options={[
              { value: "rizer", label: "Rizer" },
              { value: "learner", label: "Learner" },
            ]}
          />
        </div>
        <div className="flex flex-row gap-2 w-full">
          <SharedTypography level={2} className="font-bold text-2xl text-black">
            Selection
          </SharedTypography>
          <SharedTreeSelect
          value={treeSelectValue}
            disabled
            showLeafIcon={true}
            width={200}
            treeLine={true}
            showTreeIcon={false}
            treeData={treeData}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-row w-full gap-3">
        <SharedSider
          collapsed={treebarCollapsed}
          onCollapse={() => setTreebarCollapsed(!treebarCollapsed)}
        //   collapsedWidth={44}
          width={160}
          breakpoint="lg"
        >
          <SharedTree
            treeData={treeData}
            // showLine
            onSelect={handleTreeSelect}
            // onExpand={handleExpand}
            // expandedKeys={expandedKeys}
            // selectedKeys={selectedKeys}
          />
        </SharedSider>

        {/* table */}
        <AuthorizationTable />
      </div>
    </div>
  );
};

export default AuthorizationTab;
