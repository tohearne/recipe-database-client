'use strict'

const store = require('../store')
const signUpFormTemplate = require('../templates/sign-up-form.handlebars')
const signInFormTemplate = require('../templates/sign-in-form.handlebars')
const changePasswordFormTemplate = require('../templates/change-password-form.handlebars')
const recipeFormTemplate = require('../templates/recipe-form.handlebars')
const ingredientFormTemplate = require('../templates/ingredient-form.handlebars')
const stepFormTemplate = require('../templates/step-form.handlebars')
const recipePreviewTemplate = require('../templates/recipe-preview.handlebars')
const recipeFullTemplate = require('../templates/recipe-full.handlebars')

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
  loggedIn()
}

const onChangePasswordSuccess = () => {
  $('.form-message').text('Password Changed!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignOutSuccess = () => {
  $('.form-message').text('Signed Out!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
  loggedOut()
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

const onIndexRecipesSuccess = responseData => {
  $('.main-content').html(recipePreviewTemplate({ recipes: orderRecipes(responseData.recipes) }))
  if (store.loggedIn) {
    loggedIn()
  } else loggedOut()
}

const onShowRecipeSuccess = responseData => {
  $('.overlay').html(recipeFullTemplate({ recipe: responseData.recipe }))
  if (store.loggedIn) {
    loggedIn()
  } else loggedOut()
}

const onCreateFavoriteSuccess = responseData => {
  console.log(responseData)
}

const closeOverlay = () => {
  $('.overlay').empty()
}

const orderRecipes = recipes => {
  if (store.sortType === 'popular') {
    return recipes.sort((x, y) => (x.favorites.length > y.favorites.length) ? -1 : 1)
  } return recipes.reverse()
}

const loggedIn = () => {
  store.loggedIn = true
  $('.logged-in').removeClass('disable')
  $('.logged-out').addClass('disable')
}

const loggedOut = () => {
  store.loggedIn = false
  $('.logged-in').addClass('disable')
  $('.logged-out').removeClass('disable')
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
  onIndexRecipesSuccess,
  onShowRecipeSuccess,
  onCreateFavoriteSuccess,
  closeOverlay,
  loggedIn,
  loggedOut
}
