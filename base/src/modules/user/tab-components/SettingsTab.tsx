import { useState } from "react";
import SharedTypography from "../../../shared-components/atoms/SharedTypography";
import SharedButton from "../../../shared-components/atoms/SharedButton";
import SharedCheckbox from "../../../shared-components/atoms/SharedCheckbox";

const SettingsTab = () => {
  const [isLockedUserChecked, setIsLockedUserChecked] = useState<boolean>(false);
  const [isChangePwdChecked, setIsChangePwdChecked] = useState<boolean>(false);

  return (
    <div className="h-auto w-full flex flex-col items-start justify-start px-4 gap-3">
      <div className="flex flex-row justify-between gap-3 w-3/4 lg:w-1/2">
        <div className="flex flex-col w-full justify-start items-start">
          <SharedTypography
            level={2}
            className="font-normal text-2xl text-black"
          >
            Password
          </SharedTypography>
          <SharedTypography level={2} className="font-bold text-2xl text-black">
            ********
          </SharedTypography>
        </div>
        <SharedButton size="small" type="primary" className="w-auto flex justify-end items-center">
          Reset
        </SharedButton>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <SharedTypography level={2} className="font-normal text-2xl text-black">
          Password Expiration
        </SharedTypography>
        <SharedTypography level={2} className="font-bold text-2xl text-black">
          Once a Month
        </SharedTypography>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <SharedTypography level={2} className="font-normal text-2xl text-black">
          Defaults
        </SharedTypography>
        <SharedTypography level={2} className="font-bold text-2xl text-black">
          System 01
        </SharedTypography>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flow-row gap-1">
          <SharedCheckbox
          checked={isLockedUserChecked}
          onChange={() => setIsLockedUserChecked(!isLockedUserChecked)}
          />
          <SharedTypography
            level={2}
            className="font-normal text-2xl text-black"
          >
            Locked User
          </SharedTypography>
        </div>
        <div className="flex flow-row gap-1">
          <SharedCheckbox
           checked={isChangePwdChecked}
           onChange={() => setIsChangePwdChecked(!isChangePwdChecked)}
            />
          <SharedTypography
            level={2}
            className="font-normal text-2xl text-black"
          >
            Change Password at Next Logon
          </SharedTypography>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
