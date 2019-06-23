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
const recipeUpdateTemplate = require('../templates/recipe-update.handlebars')
const recipeDeleteTemplate = require('../templates/recipe-delete.handlebars')
const buttonFavoriteTemplate = require('../templates/button-favorite.handlebars')
const buttonUnfavoriteTemplate = require('../templates/button-unfavorite.handlebars')
const buttonEditTemplate = require('../templates/button-edit.handlebars')
const noContentTemplate = require('../templates/no-content.handlebars')

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
  $('.form-message').text('Signed Up!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onFailure = (type) => {
  $('.form-message').text(`Failed to ${type}!`).addClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignInSuccess = responseData => {
  saveUserAuth(responseData)
  $('.login-message').text(`Welcome ${store.userAuth.cook.name}`).removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
  loggedIn()
  closeOverlay()
}

const onChangePasswordSuccess = () => {
  $('.form-message').text('Password Changed!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onSignOutSuccess = () => {
  $('.login-message').text('Signed Out!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
  loggedOut()
}

const onCreateRecipeSuccess = () => {
  $('.form-message').text('Recipe Created!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
}

const onUpdateRecipeSuccess = () => {
  $('.form-message').text('Recipe Updated!').removeClass('failed').fadeIn(messageFadeIn).delay(messageDurration).fadeOut(messageFadeOut)
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

const showRecipeUpdate = responseData => {
  responseData.recipe.ingredients = responseData.recipe.ingredients.sort((x, y) => (x.id > y.id) ? 1 : -1)
  responseData.recipe.steps = responseData.recipe.steps.sort((x, y) => (x.id > y.id) ? 1 : -1)
  store.recipe = responseData.recipe
  $('.overlay').html(recipeUpdateTemplate({ recipe: responseData.recipe }))
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
  const recipes = orderRecipes(responseData.recipes)
  if (recipes.length === 0) $('.main-content').html(noContentTemplate())
  else {
    $('.main-content').html(recipePreviewTemplate({ recipes: recipes }))
    setButtons()
  }
}

const onShowRecipeSuccess = responseData => {
  responseData.recipe.ingredients = responseData.recipe.ingredients.sort((x, y) => (x.id > y.id) ? 1 : -1)
  responseData.recipe.steps = responseData.recipe.steps.sort((x, y) => (x.id > y.id) ? 1 : -1)
  $('.overlay').html(recipeFullTemplate({ recipe: responseData.recipe }))
  store.overlay = true
  setButtons()
}

const showRecipeDelete = id => {
  $('.confirmation').html(recipeDeleteTemplate({recipe: store.recipe}))
}

const onDeleteRecipeSuccess = returnData => {
  closeOverlay()
  closeConfirmation()
}

const closeOverlay = event => {
  $('.overlay').empty()
  store.overlay = false
}

const closeConfirmation = event => {
  $('.confirmation').empty()
}

const orderRecipes = recipes => {
  if (store.filterType === 'favorites') recipes = recipes.filter(recipe => recipe.users.some(user => user.id === store.userAuth.id))
  else if (store.filterType === 'user') recipes = recipes.filter(recipe => recipe.cook.id === store.userAuth.cook.id)
  recipes = recipes.reverse()
  if (store.sortType === 'popular') {
    recipes = recipes.sort((x, y) => (x.favorites.length > y.favorites.length) ? -1 : 1)
  }
  if (store.searchStr) recipes = recipes.filter(recipe => recipe.name.toUpperCase().includes(store.searchStr.toUpperCase()))
  return recipes
}

const setButtons = () => {
  if (store.loggedIn) {
    loggedIn()
    const buttons = $('.fav-edit-button')
    for (let i = 0; i < buttons.length; i++) {
      const recipeId = buttons[i].getAttribute('data-id')
      if (store.userData.recipes.some(recipe => `${recipe.id}` === recipeId)) {
        buttons[i].innerHTML = buttonEditTemplate({id: recipeId})
      } else if (store.userData.favorites.some(fav => `${fav.recipe_id}` === recipeId)) {
        buttons[i].innerHTML = buttonUnfavoriteTemplate({ button: {
          id: recipeId,
          favid: `${store.userData.favorites.find(fav => `${fav.recipe_id}` === recipeId).id}`
        }
        })
      } else {
        buttons[i].innerHTML = buttonFavoriteTemplate({id: recipeId})
      }
    }
  } else loggedOut()
}

const loggedIn = () => {
  store.loggedIn = true
  $('.logged-in').removeClass('disable')
  $('.logged-out').addClass('disable')
}

const loggedOut = () => {
  store.loggedIn = false
  store.filterType = ''
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
  onCreateRecipeSuccess,
  onUpdateRecipeSuccess,
  showSignUp,
  showSignIn,
  showChangePassword,
  showRecipeForm,
  showRecipeUpdate,
  onIndexRecipesSuccess,
  onShowRecipeSuccess,
  showRecipeDelete,
  onDeleteRecipeSuccess,
  setButtons,
  closeOverlay,
  closeConfirmation,
  loggedIn,
  loggedOut
}
