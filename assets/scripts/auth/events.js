'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  event.target.reset()
  const signUpData = {credentials: formData['credentials']}
  api.signUp(signUpData)
    .then(responseData => {
      ui.saveUserAuth(responseData)
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
    .then(responseData => {
      ui.onSignInSuccess(responseData)
      api.getUserData(responseData.user.id)
        .then(responseData => {
          ui.saveUserData(responseData)
          loggedIn()
        })
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
  event.target.reset()
  api.createRecipe(formData.recipe.name)
    .then(responseData => {
      formData['ingredient-names'].forEach((name, index) => {
        api.createIngredient(name, formData['ingredient-amounts'][index], responseData.recipe.id)
      })
      formData['step-titles'].forEach((title, index) => {
        api.createStep(title, formData['step-instructions'][index], responseData.recipe.id)
      })
    })
    .catch(val => { ui.onFailure('Create Recipe') })
}

const loggedOut = () => {
}

const loggedIn = () => {
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateRecipe,
  loggedOut
}
