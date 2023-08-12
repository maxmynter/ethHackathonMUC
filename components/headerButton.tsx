import { usePathname } from "next/navigation";
import Link from "next/link";
import { HeaderButtonObject } from "../types/global";

const HeaderButton = ({
  buttonInfo,
  size = String(4),
}: {
  buttonInfo: HeaderButtonObject;
  size?: string;
}) => {
  const path = usePathname();
  return (
    <div
      className={`border-b-4 border-sky-500 flex flex-col justify-center rounded-lg ${
        path === buttonInfo.linkTo
          ? "text-white bg-sky-500 hover:bg-sky-700 hover:border-sky-700"
          : "hover:bg-sky-700 hover:border-sky-700 hover:text-white"
      }`}
    >
      <Link href={buttonInfo.linkTo}>
        <p className="font-bold p-2">{buttonInfo.text}</p>
      </Link>
    </div>
  );
};

export default HeaderButton;
