//imports react
import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

//imports css
import './menu.css'



const MenuBar = () => {
    return (
        <div>
            <Navbar className="menu" collapseOnSelect expand="sm">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="menutext" to="/" >Períodos  </Link>
                        <Link className="menutext" to="/departamentos">Departamentos  </Link>
                        <Link className="menutext" to="/nome">Nome</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default MenuBar