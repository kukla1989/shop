import { Navbar as NavbarBs, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

import { navDetails } from './constant'
import { ShoppingCart } from '../../assets/ShoppingCart';

export function Navbar() {
  
  return (
    <NavbarBs sticky='top' className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className='me-auto'>
            {navDetails.map((nav, index) => (
                <Nav.Link key={index} to={nav.url} as={NavLink}>{nav.name}</Nav.Link>
            ))}
        </Nav>
        <Button 
          style={{ width: '3rem', height: '3rem', position: 'relative' }}
          variant='outline-primary'
          className='rounded-circle'
        >
          <ShoppingCart/>
          <div 
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{ color: 'white ', width:'1.5rem', height: '1.5rem', position: 'absolute', bottom: 0, right: 0, transform: 'translate(25%, 25%'}}
          >
            3
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}
