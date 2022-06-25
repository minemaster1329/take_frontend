import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layoutcomponents/Layout";
import Home from "./components/Home";
import ClientsOverview from "./components/clientcomponents/ClientsOverview";
import NotFound from "./components/NotFound";
import DefinedRoutesOverview from "./components/definedroutecomponents/DefinedRoutesOverview";
import AddNewDefinedRoute from "./components/definedroutecomponents/AddNewDefinedRoute";
import RoutesOverview from "./components/routecomponents/RoutesOverview";
import PackagesOverview from "./components/packagecomponents/PackagesOverview";
import AddNewClient from "./components/clientcomponents/AddNewClient";
import EditClient from "./components/clientcomponents/EditClient";
import ClientDetails from "./components/clientcomponents/ClientDetails";
import CarsOverview from "./components/carcomponents/CarsOverview";
import AddNewCar from "./components/carcomponents/AddNewCar";
import EditCar from "./components/carcomponents/EditCar";
import CarDetails from "./components/carcomponents/CarDetails";
import {AddNewUser} from "./components/usercomponents/AddNewUser";
import AddNewPackage from "./components/packagecomponents/AddNewPackage";
import AddNewDefinedRoute from "./components/definedroutecomponents/AddNewDefinedRoute";
import AddNewRoute from "./components/routecomponents/AddNewRoute";



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
              <Route path='addnewdefinedroute' element={<AddNewDefinedRoute/>}/>
              <Route path='definedroutesoverview' element={<DefinedRoutesOverview/>}/>
              <Route path='addnewdefinedroute' element={<AddNewDefinedRoute/>}/>
                {/*Routes routes*/}
              <Route path='routesoverview' element={<RoutesOverview/>}/>
              <Route path='addnewroute' element={<AddNewRoute/>}/>
                {/*Routes routes*/}
              <Route path='carsoverview' element={<CarsOverview/>}/>
              <Route path='addnewcar' element={<AddNewCar/>}/>
              <Route path='editcar' element={<EditCar/>}/>
              <Route path='cardetails' element={<CarDetails/>}/>
                {/*Packages routes*/}
              <Route path='addnewpackage' element ={<AddNewPackage/>}/>
                {/*Users route*/}
              <Route path='addnewuser' element={<AddNewUser/>}/>
                {/*Other routes*/}
              <Route path='*' element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
