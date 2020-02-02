import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => (
  <div className='outestdiv'>
    <div className='outerdiv'>
      <div className='inner_outerdiv'>
        <ul className='titlelogo'>
          <Link to='/'>
            <a href='/'>
              <li>dripFit</li>
            </a>
          </Link>
        </ul>
        <ul className='navigation'>
          <Link to='/wardrobe'>
            <a className='right_link' href='/wardrobe'>
              <li>my wardrobe</li>
            </a>
          </Link>
          <Link to='/add'>
            <a className='right_link' href='/add'>
              <li>add</li>
            </a>
          </Link>
          <Link to='/recommend'>
            <a className='right_link' href='/fit'>
              <li>recommend fit</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
