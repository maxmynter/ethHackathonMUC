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
      className={`border-${size} border-sky-500 m-${size} rounded-lg ${
        path === buttonInfo.linkTo ? "text-white bg-sky-500" : ""
      }`}
    >
      <Link href={buttonInfo.linkTo}>
        <p className="font-bold p-2">{buttonInfo.text}</p>
      </Link>
    </div>
  );
};

export default HeaderButton;
