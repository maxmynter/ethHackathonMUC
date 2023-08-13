import { usePathname } from "next/navigation";
import Link from "next/link";
import { HeaderButtonObject } from "../../types/global";

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
      className={`flex flex-col justify-center mx-2 px-1 drop-shadow-lg rounded-lg ${
        path === buttonInfo.linkTo
          ? "text-white bg-sky-700 hover:bg-sky-700"
          : "bg-white hover:bg-sky-500  hover:text-white"
      }`}
    >
      <Link href={buttonInfo.linkTo}>
        <p className="font-bold p-2">{buttonInfo.text}</p>
      </Link>
    </div>
  );
};

export default HeaderButton;
