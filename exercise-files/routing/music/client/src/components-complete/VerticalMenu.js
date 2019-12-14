import React from 'react';

import { NavLink } from 'react-router-dom';

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, albumsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {
      albums.map((album) => (
        <NavLink
          to={`${albumsPathname}/${album.id}`}
          className='item'
          key={album.id}
        >
          {album.name}
        </NavLink>
      ))
    }
  </div>
);

export default VerticalMenu;
