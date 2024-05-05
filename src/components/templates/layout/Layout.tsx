import { Routes, Route } from "react-router-dom";
import HomePage from "../home-page/HomePage";
import { StyledLayout } from "./Layout.style";
import HeaderSection from "../../organisms/header-section/HeaderSection";
import PokemonDetails from "../pokemon-details/PokemonDetails";

const Layout = () => {
  
  const getRoutingSetup = () => {
    return (
      <>
      <HeaderSection />


        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          {/* <Route path="/pokemon/" element={<PokemonDetails />} /> */}
          <Route path="pokemon/:id" element={<PokemonDetails />} />
          <Route path="*" element={<div>Not Found </div>} />
        </Routes>
      </>
    );
  };

  return (
    <StyledLayout>
      <div className="pokemon-layout">{getRoutingSetup()}</div>
    </StyledLayout>
  );
};
export default Layout;
