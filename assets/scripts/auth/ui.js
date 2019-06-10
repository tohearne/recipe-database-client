'use strict'

const store = require('../store')
const recipeFormTemplate = require('../templates/recipe-form.handlebars')
const ingredientFormTemplate = require('../templates/ingredient-form.handlebars')
const stepFormTemplate = require('../templates/step-form.handlebars')

const messageFadeIn = 300
const messageDurration = 3000
const messageFadeOut = 400

const onSignUpSuccess = responseData => {
  console.log(responseData)
  store.userAuth = responseData.user
  // $('.login-message').text('Signed Up!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onCreateCookSuccess = responseData => {
  console.log(responseData)
  $('.login-message').text('Signed Up!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onFailure = (type) => {
  $('.form-message').text(`Failed to ${type}!`).addClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignInSuccess = responseData => {
  store.userAuth = responseData.user
  $('.form-message').text('Signed In!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const saveUserData = responseData => {
  console.log(responseData)
  store.userData = responseData.user
  // $('.form-message').text('Signed In!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onChangePasswordSuccess = () => {
  $('.form-message').text('Password Changed!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignOutSuccess = () => {
  $('.form-message').text('Signed Out!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const showRecipeForm = () => {
  $('.overlay').html(recipeFormTemplate)
  $('.ingredient-add').on('click', addNewIngredientLine)
  $('.step-add').on('click', addNewStepLine)
}

const addNewIngredientLine = event => {
  event.preventDefault()
  $('.ingredients').append(ingredientFormTemplate)
}

const addNewStepLine = event => {
  event.preventDefault()
  $('.steps').append(stepFormTemplate)
}

module.exports = {
  onSignUpSuccess,
  onCreateCookSuccess,
  onFailure,
  onSignInSuccess,
  saveUserData,
  onChangePasswordSuccess,
  onSignOutSuccess,
  showRecipeForm,
  addNewIngredientLine,
  addNewStepLine
}
