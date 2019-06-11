'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
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
    .catch()
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
      api.getUserData(store.userAuth.id)
        .then(returnData => {
          ui.saveUserData(returnData)
        })
        .catch()
    })
    .catch(val => { ui.onFailure('Create Recipe') })
}

const onIndexRecipes = () => {
  api.indexRecipes()
    .then(ui.onIndexRecipesSuccess)
    .catch()
}

const onShowRecipe = event => {
  api.showRecipe($(event.target).data('id'))
    .then(ui.onShowRecipeSuccess)
    .catch()
}

const onCreateFavorite = event => {
  api.createFavorite($(event.target).data('id'))
    .then(responseData => {
      ui.onCreateFavoriteSuccess(responseData)
      api.getUserData(store.userAuth.id)
        .then(returnData => {
          ui.saveUserData(returnData)
        })
        .catch()
    })
    .catch()
}

const onSetOrder = sortType => {
  store.sortType = sortType
  onIndexRecipes()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateRecipe,
  onIndexRecipes,
  onShowRecipe,
  onCreateFavorite,
  onSetOrder
}
