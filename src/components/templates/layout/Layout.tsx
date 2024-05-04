import { Routes, Route } from "react-router-dom";
import HomePage from "../home-page/HomePage";
import { StyledLayout } from "./Layout.style";
import SearchSection from "../../organisms/search-section/SearchSection";
import { useState } from "react";
import HeaderSection from "../../organisms/header-section/HeaderSection";
import PokemonDetails from "../pokemon-details/PokemonDetails";

const Layout = () => {
  const [resetFilters, setResetFilters] = useState<boolean>(false);

  const getRoutingSetup = () => {
    return (
      <>
      <HeaderSection />
        <SearchSection
          resetFilters={resetFilters}
          setResetFilters={setResetFilters}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage setResetFilters={setResetFilters} />}
          />
          <Route path="/pokemon" element={<PokemonDetails />} />
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
