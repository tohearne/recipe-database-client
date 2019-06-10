'use strict'

const store = require('../store')
const signUpFormTemplate = require('../templates/sign-up-form.handlebars')
const signInFormTemplate = require('../templates/sign-in-form.handlebars')
const changePasswordFormTemplate = require('../templates/change-password-form.handlebars')
const recipeFormTemplate = require('../templates/recipe-form.handlebars')
const ingredientFormTemplate = require('../templates/ingredient-form.handlebars')
const stepFormTemplate = require('../templates/step-form.handlebars')

const messageFadeIn = 300
const messageDurration = 3000
const messageFadeOut = 400

const saveUserAuth = responseData => {
  store.userAuth = responseData.user
}

const saveUserData = responseData => {
  store.userData = responseData.user
}

const onCreateCookSuccess = responseData => {
  $('.login-message').text('Signed Up!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onFailure = (type) => {
  $('.form-message').text(`Failed to ${type}!`).addClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignInSuccess = responseData => {
  saveUserAuth(responseData)
  $('.form-message').text('Signed In!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onChangePasswordSuccess = () => {
  $('.form-message').text('Password Changed!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignOutSuccess = () => {
  $('.form-message').text('Signed Out!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const showSignUp = () => {
  $('.overlay').html(signUpFormTemplate)
}

const showSignIn = () => {
  $('.overlay').html(signInFormTemplate)
}

const showChangePassword = () => {
  $('.overlay').html(changePasswordFormTemplate)
}

const showRecipeForm = () => {
  $('.overlay').html(recipeFormTemplate)
  $('.ingredient-add').on('click', addNewIngredientLine)
  $('.step-add').on('click', addNewStepLine)
}

const addNewIngredientLine = () => {
  $('.ingredients').append(ingredientFormTemplate)
}

const addNewStepLine = () => {
  $('.steps').append(stepFormTemplate)
}

const closeOverlay = () => {
  $('.overlay').empty()
}

module.exports = {
  saveUserAuth,
  saveUserData,
  onCreateCookSuccess,
  onFailure,
  onSignInSuccess,
  onChangePasswordSuccess,
  onSignOutSuccess,
  showSignUp,
  showSignIn,
  showChangePassword,
  showRecipeForm,
  closeOverlay
}
