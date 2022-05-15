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
import AddNewClient from "./components/clientcomponents/AddNewClient";
import EditClient from "./components/clientcomponents/EditClient";
import ClientDetails from "./components/clientcomponents/ClientDetails";

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
                {/*Client routes*/}
              <Route path='addnewclient' element={<AddNewClient/>}/>
              <Route path='clientsoverview' element={<ClientsOverview/>}/>
              <Route path='editclient' element={<EditClient/>}/>
              <Route path='clientdetails' element={<ClientDetails/>}/>
                {/*defined Routes routes*/}
              <Route path='definedroutesoverview' element={<DefinedRoutesOverview/>}/>
                {/*Routes routes*/}
              <Route path='routesoverview' element={<RoutesOverview/>}/>
                {/*Packages routes*/}
              <Route path='packagesoverview' element={<PackagesOverview/>}/>
                {/*Other routes*/}
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
