import React, { Fragment } from 'react';
import defaultImage from '../../images/wheel.jpg'

export default function GroupAvatarImage({ src, ...props }) {
  return (
    <Fragment>
      <img src={src || defaultImage} alt={props.alt || 'avatar group'} {...props}/>
    </Fragment>
  );
}
