import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layoutcomponents/Layout";
import Home from "./components/Home";
import ClientsOverview from "./components/clientcomponents/ClientsOverview";
import NotFound from "./components/NotFound";
import DefinedRoutesOverview from "./components/definedroutecomponents/DefinedRoutesOverview";
import RoutesOverview from "./components/routecomponents/RoutesOverview";
import PackagesOverview from "./components/packagecomponents/PackagesOverview";

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='clientsoverview' element={<ClientsOverview/>}/>
              <Route path='definedroutesoverview' element={<DefinedRoutesOverview/>}/>
              <Route path='routesoverview' element={<RoutesOverview/>}/>
              <Route path='packagesoverview' element={<PackagesOverview/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
