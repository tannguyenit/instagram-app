import React, { Fragment } from 'react';
import omg from '../../images/omg.png'

export default function Welcome() {
  return (
    <Fragment>
      <div class="notes_wrapper">
        <div class="welcome_div">
          <img src={omg} alt="omg"/>
        </div>
      </div>

      <div class="github-stats">
        <iframe src="https://ghbtns.com/github-btn.html?user=yTakkar&type=follow&count=false&size=large" frameBorder="0" scrolling="0" width="180px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=yTakkar&repo=React-Instagram-Clone-2.0&type=fork&count=true&size=large" frameBorder="0" scrolling="0" width="125px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=yTakkar&repo=React-Instagram-Clone-2.0&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
      </div>
    </Fragment>
  );
}