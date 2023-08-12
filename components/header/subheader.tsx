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
      className={`border-b-2 border-sky-500 flex flex-col justify-center rounded-lg ${
        isActive
          ? "text-white bg-sky-500 hover:bg-sky-700 hover:border-sky-700"
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
    <div className="w-full flex justify-center pb-2 bg-stone-200">
      <div className="w-64 justify-between">
        <div className="flex flex-row justify-between">
          {statesArray.map((stte) => {
            return (
              <SubHeaderButton
                key={stte}
                text={stte}
                isActive={stte === headerState}
                onClick={() => {
                  setHeaderState(stte);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
