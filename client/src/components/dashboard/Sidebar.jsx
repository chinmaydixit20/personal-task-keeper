import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { FaCalendarDay, FaInbox } from 'react-icons/fa'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav vertical className="pb-3 pt-5 list-unstyled sidebar-list">
                <NavItem className="mb-2 pl-3" >
                    <NavLink href="#" style={{ textDecoration: 'none', color: 'black' }}>
                        <FaInbox className="mr-2" size={25}/>
                        Inbox
                    </NavLink>
                </NavItem>
                <NavItem className="mb-2 pl-3 " >
                    <NavLink href="#" style={{ textDecoration: 'none', color: 'black' }}>
                        <FaCalendarDay className="mr-2" size={25}/>
                        Today
                    </NavLink>
                </NavItem>
            </Nav>

        </div>
    )
}

export default Sidebar
