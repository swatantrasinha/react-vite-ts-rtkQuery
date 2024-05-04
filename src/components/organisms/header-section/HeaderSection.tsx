import { Link } from "react-router-dom";
import {StyledHeaderSection} from './HeaderSection.style';


const HeaderSection = () => {
  return (
    <StyledHeaderSection>
    <header>
      <div className="logo-separator-heading">
        <div className="header-logo-container">
          <Link to="/">
            <h1 className="header-nav-logo">Pokédex</h1>
          </Link>
        </div>

        <div className="vertical-line-separator"/>
        <div className="header-heading">Search for any Pokémon that exists on the planet</div>
      </div>
    </header>
    </StyledHeaderSection>
  );
};

export default HeaderSection;
