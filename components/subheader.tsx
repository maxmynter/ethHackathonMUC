import React, { Dispatch, SetStateAction } from "react";

const SubHeaderButton = ({
  isActive,
  text,
  onClick,
}: {
  isActive: boolean;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={`border-2 border-sky-500 m-2 rounded-lg ${
        isActive
          ? "text-white bg-sky-500"
          : "hover:bg-sky-700 hover:border-sky-700 hover:text-white"
      }`}
      onClick={onClick}
    >
      <p className="p-1">{text}</p>
    </div>
  );
};

const SubHeader = ({
  statesArray,
  headerState,
  setHeaderState,
}: {
  statesArray: string[];
  headerState: string;
  setHeaderState: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row justify-center">
      {statesArray.map((ste) => {
        return (
          <SubHeaderButton
            key={ste}
            text={ste}
            isActive={ste === headerState}
            onClick={() => {
              setHeaderState(ste);
            }}
          />
        );
      })}
    </div>
  );
};

export default SubHeader;
