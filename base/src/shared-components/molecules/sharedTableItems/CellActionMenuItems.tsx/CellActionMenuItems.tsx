import { MRT_ActionMenuItem } from "material-react-table";

type Props = {
  table: any;
  menuItems: any;
};

const CellActionMenuItems = (props: Props) => {
  console.log('item arrrrr', props.menuItems);
  return (
    <>
      {props.menuItems.map((item: any) => {
        console.log('item', item);
        
        return (
          <MRT_ActionMenuItem
            icon={item.icon}
            key={item.key}
            label={item.label}
            onClick={item.onClick}
            table={props.table}
          />
        );
      })}
    </>
  );
};

export default CellActionMenuItems;
