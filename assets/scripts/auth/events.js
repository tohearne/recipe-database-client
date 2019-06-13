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
      api.getUserData()
        .then(returnData => {
          ui.saveUserData(returnData)
          onIndexRecipes()
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
    .then(responseData => {
      ui.onSignOutSuccess(responseData)
      onIndexRecipes()
    })
    .catch()
}

const onCreateRecipe = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  event.target.reset()
  api.createRecipe(formData.recipe.name)
    .then(async function (responseData) {
      for (let i = 0; i < formData['ingredient-names'].length; i++) {
        await api.createIngredient(formData['ingredient-names'][i], formData['ingredient-amounts'][i], responseData.recipe.id)
      }
      for (let i = 0; i < formData['step-titles'].length; i++) {
        await api.createStep(formData['step-titles'][i], formData['step-instructions'][i], responseData.recipe.id)
      }
      api.getUserData()
        .then(returnData => {
          ui.saveUserData(returnData)
          ui.onCreateRecipeSuccess()
          onIndexRecipes()
        })
        .catch()
    })
    .catch(val => { ui.onFailure('Create Recipe') })
}

const onUpdateRecipe = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.updateRecipe(store.recipe.id, formData.recipe.name)
    .then(responseData => {
      store.recipe.ingredients.forEach((ingredient, index) => {
        api.updateIngredient(ingredient.id, formData['ingredient-names'][index], formData['ingredient-amounts'][index])
      })
      store.recipe.steps.forEach((step, index) => {
        api.updateStep(step.id, formData['step-titles'][index], formData['step-instructions'][index])
      })
      api.getUserData()
        .then(returnData => {
          ui.saveUserData(returnData)
          ui.onUpdateRecipeSuccess()
          onIndexRecipes()
        })
        .catch()
    })
    .catch(val => { ui.onFailure('Update Recipe') })
}

const onDeleteRecipe = event => {
  api.showRecipe(store.recipe.id)
    .then(() => {
      api.deleteRecipe(store.recipe.id)
        .then(() => {
          ui.onDeleteRecipeSuccess()
          onIndexRecipes()
        })
    })
    .catch()
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
      api.getUserData()
        .then(returnData => {
          ui.saveUserData(returnData)
          onIndexRecipes()
        })
        .catch()
    })
    .catch()
}

const onDeleteFavorite = event => {
  api.deleteFavorite($(event.target).data('favid'))
    .then(responseData => {
      api.getUserData()
        .then(returnData => {
          ui.saveUserData(returnData)
          onIndexRecipes()
        })
        .catch()
    })
    .catch()
}

const onShowRecipeUpdate = event => {
  api.showRecipe($(event.target).data('id'))
    .then(ui.showRecipeUpdate)
    .catch()
}

const onSetOrder = sortType => {
  store.sortType = sortType
  onIndexRecipes()
}

const onSetFilter = filterType => {
  store.filterType = filterType
  onIndexRecipes()
}

const onSearch = event => {
  event.preventDefault()
  store.searchStr = getFormFields(event.target).search.text
  onIndexRecipes()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateRecipe,
  onUpdateRecipe,
  onDeleteRecipe,
  onIndexRecipes,
  onShowRecipe,
  onCreateFavorite,
  onDeleteFavorite,
  onShowRecipeUpdate,
  onSetOrder,
  onSetFilter,
  onSearch
}
