import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function NavMenu(){
    const [navbarOpened, toggleNavbarOpened] = useState(false)

    return(
        <header style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <Navbar expand='sm' light>
                <NavbarBrand href='/'>
                    Delivery company system
                </NavbarBrand>
                <NavbarToggler onClick={() => toggleNavbarOpened(!navbarOpened)}/>
                <Collapse navbar isOpen={navbarOpened} className="flex-row-reverse">
                    <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-dark">
                                Clients
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to='/clientsoverview'>
                                    Overview
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/addnewclient'>
                                    Add new
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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