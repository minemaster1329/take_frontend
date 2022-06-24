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
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-dark">
                                Cars
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to='/carsoverview'>
                                    Overview
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/addnewcar'>
                                    Add new
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-dark">
                                Defined routes
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag={Link} to='/definedroutesoverview'>
                                    Overview
                                </DropdownItem>
                                <DropdownItem tag={Link} to='/addnewdefinedroute'>
                                    Add new
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavItem>
                            <NavLink href='/routesoverview'>
                                Routes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/addnewpackage'>
                                Packages
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/addnewuser'>
                                Add new user
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    )
}