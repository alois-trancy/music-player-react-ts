import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

type NavProps = {
  isLibraryOpen: boolean,
  setIsLibraryOpen: Dispatch<SetStateAction<boolean>>,
}

const Nav = ({ isLibraryOpen, setIsLibraryOpen }: NavProps) => {
  return (
    <nav className="nav">
      <h1 className="nav-title">Waves</h1>
      <button className="nav-button" onClick={() => setIsLibraryOpen(!isLibraryOpen)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;