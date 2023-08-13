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
      className={`flex font-bold flex-col justify-center mx-2 drop-shadow-lg rounded-lg ${
        isActive
          ? "text-white bg-sky-700 hover:bg-sky-700"
          : "bg-white hover:bg-sky-500  hover:text-white"
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
    <div className="w-full flex ">
      <div className="w-64 justify-center pv-2 pl-10">
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
