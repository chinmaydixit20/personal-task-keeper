import React, { useState, useContext } from 'react'
import UserContext from '../../usercontext'
import { useHistory } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavItem,
    NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap';


const NavbarDash = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const logout = (e) => {
    e.preventDefault();

    setUserData({
      user: undefined,
      token: undefined
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" dark expand="md">
        <NavbarBrand href="/"><span className="font-weight-bold">Personal Task</span> Keeper</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="#" onClick={logout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

}



export default NavbarDash
