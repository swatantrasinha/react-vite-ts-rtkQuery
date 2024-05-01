import { Link, Routes, Route } from 'react-router-dom';
import Pokemon from '../../features/pokemon/Pokemon';
import HomePage from '../home-page/HomePage';
import { StyledLayout } from './Layout.style';
import About from '../../features/about/About';
import SearchSection from '../../organisms/search-section/SearchSection';

 const Layout = () => {

      
      const getRoutingSetup = () => {
        return (
          <>
            <nav>
              <ul>
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/about">About</Link></li>
              </ul>
            </nav>

            <SearchSection />

             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/pokemon/:id" element={<Pokemon/>} />
                <Route path="*" element={<div>Not Found </div>} />
            </Routes> 
          </>
        )
      };

  return (
    <StyledLayout>
      <div className="pokemon-layout">
        {getRoutingSetup()}
      </div>
      
    </StyledLayout>
    
  )
}
export default Layout;