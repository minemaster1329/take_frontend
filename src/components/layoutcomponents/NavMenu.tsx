import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {useState} from "react";

export default function NavMenu(){
    const [navbarOpened, toggleNavbarOpened] = useState(false)

    return(
        <header style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <Navbar expand='sm' light>
                <NavbarBrand href='/'>
                    Delivery company system
                </NavbarBrand>
                <NavbarToggler onClick={() => toggleNavbarOpened(!navbarOpened)}/>
                <Collapse navbar isOpen={navbarOpened} className="flex-sm-row-reverse">
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/clientsoverview'>
                                Clients
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/definedroutesoverview'>
                                Defined routes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/routesoverview'>
                                Routes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/packagesoverview'>
                                Packages
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    )
}