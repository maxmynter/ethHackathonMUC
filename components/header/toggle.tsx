import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ExpandCollapseToggle = ({
  isExpanded,
  handleToggle,
}: {
  isExpanded: boolean;
  handleToggle: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="rounded-full w-12 h-12 flex justify-center items-center align-middle hover:bg-gray-600 hover:text-white text-bold"
      onClick={handleToggle}
    >
      <p>
        {isExpanded ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </p>
    </div>
  );
};

export default ExpandCollapseToggle;
