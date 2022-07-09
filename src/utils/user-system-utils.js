import { post, get } from 'axios'
import Notify from 'handy-notification'
import d from './API/DOM'
import { ObjectMssg } from './utils'
import Action from './API/Action'

export const login = async data => {
  const res = await post('/users/login', data)

  return res.data
}

export const getAuth = async () => {
    const res = await get('/users/me')

    return res.data
}

/**
 * Common function for login & signup
 *
 * @param {Object} options Options
 * @param {Object} options.data
 * @param {String} options.btn
 * @param {String} options.url
 * @param {String} options.redirect
 * @param {String} options.defBtnValue
 */
export const commonLogin = options => {
  let { data, btn, url, redirect, defBtnValue } = options,
    overlay2 = new d('.overlay-2'),
    button = new d(btn),
    action = new Action(btn)

  action.start('Please wait..')

  post(url, data)
    .then(s => {
      let {
        data: { message, success },
      } = s

      if (success) {
        Notify({
          value: message,
          done: () => (location.href = redirect),
        })

        button.setValue('Redirecting..')
        overlay2.show()
      } else {
        Notify({
          value: ObjectMssg(message),
        })

        action.end(defBtnValue)
      }

      button.blur()
    })
    .catch(e => console.log(e))
}
