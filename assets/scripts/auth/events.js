'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  event.target.reset()
  const signUpData = {credentials: formData['credentials']}
  console.log(signUpData)
  api.signUp(signUpData)
    .then(returnData => {
      ui.onSignUpSuccess(returnData)
      api.createCook(formData.cook.name)
        .then(ui.onCreateCookSuccess)
        .catch(val => { ui.onFailure('Sign Up') })
    })
    .catch(val => { ui.onFailure('Sign Up') })
}

const onSignIn = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  event.target.reset()
  api.signIn(formData)
    .then(returnData => {
      ui.onSignInSuccess(returnData)
      api.getUserData(returnData.user.id)
        .then(ui.saveUserData)
        .catch()
    })
    .catch(val => { ui.onFailure('Sign In') })
}

const onChangePassword = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  event.target.reset()
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(val => { ui.onFailure('Change Password') })
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(val => { ui.onFailure('Sign Out') })
}

const onCreateRecipe = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
}

const onLoad = event => {
  ui.showRecipeForm()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateRecipe,
  onLoad
}
