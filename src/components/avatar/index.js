import React, { Fragment } from 'react';
import defaultImage from '../../images/avatars/avatar-default.jpeg'

export default function Avatar({ avatar, ...props }) {
  return (
    <Fragment>
      <img src={avatar || defaultImage} alt="avatar user" {...props}/>
    </Fragment>
  );
}
