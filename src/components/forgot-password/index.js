import React, { Fragment } from 'react';
import omg from '../../images/omg.png'

export default function ForgotPassword() {
  return (
    <Fragment>
      <div class="notes_wrapper">

        <div class="forgot_password cua">
          <div class="display_text">
            <span>Forgot password</span>
          </div>
          <form class="form_fp">
            <span class="fp_span" >Please enter the email you registered with</span>
            <input type="email" class="fp_email" autoFocus required spellCheck="false" autoComplete='false' placeholder='Your email' />
            <input type="submit" name="" value="Proceed on" class="fp_submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}