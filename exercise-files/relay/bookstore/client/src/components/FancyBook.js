import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function, new-cap */
import React from 'react';
import Relay from 'react-relay';
import Dimensions from 'react-dimensions';

import '../styles/FancyBook.css';

/**
 * This component renders a responsive fancy 3d book.
 *
 * Credits for the original 3D book style design go to
 * [Mary Lou](https://tympanus.net/Development/3DBookShowcase/).
 **/
class FancyBook extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  };

  render() {
    const { book } = this.props;
    const pages = book.pages || 600;

    const aspectRatio = 1.2;
    const height = this.props.containerWidth * aspectRatio;
    const pagesScale = 0.00043 * this.props.containerWidth; // todo scale w/ containerWidth

    const bkLeftWidth = pages * pagesScale;
    const bkLeftLeft = bkLeftWidth * 0.5 * -1;
    const bkLeftZ = bkLeftLeft * 0.5;
    const bkBackZ = bkLeftWidth + bkLeftZ;
    const bkFrontZ = bkLeftZ * -1;

    return (
      <div className='book-container'>
        <div className='bk-book bk-bookdefault' style={{ height }}>
          <div className='bk-front' style={{
            height,
            transform: `translate3d(0,0,${bkFrontZ}px)`,
          }}
          >
            <div className='bk-cover'
              style={{
                backgroundImage: `url('${book.coverUrl}')`,
                height,
              }}
            />
          </div>
          <div className='bk-back' style={{
            height,
            transform: `rotate3d(0,1,0,-180deg) translate3d(0,0,${bkBackZ}px)`,
          }}
          />
          <div className='bk-left' style={{
            height,
            width: bkLeftWidth,
            left: bkLeftLeft,
            transform: `translate3d(0,0,${bkLeftZ}px) rotate3d(0,1,0,-90deg)`,
          }}
          />
          <div className='bk-top' />
        </div>
      </div>
    );
  }
}

export default Dimensions()(FancyBook);
