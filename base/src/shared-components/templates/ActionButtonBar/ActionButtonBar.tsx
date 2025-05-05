import { Button } from "antd";
import { useState } from "react";
import ActionButtonPopover from "../ActionButtonPopover";
import UserSearch from "../../organisms/UserSearch";
import SharedButton from "../../atoms/SharedButton";
import AntIcons from "../../../utils/AntIcons";

type Props = {
  onSearchClick?: any;
  openPopover?: boolean;
  setOpenPopover?: any;
};

const ActionButtonBar = (props: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false); 
console.log('serch opene',isSearchOpen);

  const actionButtons = [
    {
      name: "Search",
      icon: AntIcons("SearchIcon")(),
      onclick: () => console.log("Search"),
      disabled: false,
    },
    {
      name: "Add",
      icon: AntIcons("AddIcon")(),
      onclick: () => console.log("Add"),
      disabled: true,
    },
    {
      name: "Save",
      icon: AntIcons("SaveIcon")(),
      onclick: () => console.log("Save"),
      disabled: true,
    },
    {
      name: "Previous",
      icon: AntIcons("PreviousIcon")(),
      onclick: () => console.log("Prev"),
      disabled: false,
    },
    {
      name: "Next",
      icon: AntIcons("NextIcon")(),
      onclick: () => console.log("next"),
      disabled: true,
    },
    {
      name: "Delete",
      icon: AntIcons("DeleteIcon")(),
      onclick: () => console.log("Delete"),
      disabled: true,
    },
  ];

  const hideSearchPopover = () => {
    console.log('open stts', props.onSearchClick);
    setIsSearchOpen(false)
  };
  const handleOpenChange = (newOpen: boolean) => {
    setIsSearchOpen(newOpen);
  };
  return (
    <>
      {actionButtons.map((button, index) =>
        button.name == "Search" ? (
          <ActionButtonPopover
            content={
              <UserSearch
                onSearchClick={props.onSearchClick}
                onCancelClick={hideSearchPopover}
              />
            }
            title={button.name}
            open={isSearchOpen} 
          onOpenChange={handleOpenChange}
          >
            <Button
              disabled={button.disabled}
              size="small"
              type="text"
              className="!text-blue-800 font-bold"
              onClick={button.onclick}
              icon={button.icon}
            />
          </ActionButtonPopover>
        ) : (
          <SharedButton
            disabled={button.disabled}
            size="small"
            type="text"
            className="!text-blue-800 font-bold bg-red-100"
            onClick={button.onclick}
            icon={button.icon}
          />
        )
      )}
    </>
  );
};

export default ActionButtonBar;
