'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const authUi = require('./auth/ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authUi.loggedOut()
  authEvents.onSetOrder('new')
  $('.search-bar').on('submit', authEvents.onSearch)
  $('.user-auth').on('click', '.show-sign-up', authUi.showSignUp)
  $('.user-auth').on('click', '.show-sign-in', authUi.showSignIn)
  $('.user-auth').on('click', '.show-change-pw', authUi.showChangePassword)
  $('.user-auth').on('click', '.user-sign-out', authEvents.onSignOut)
  $('main').on('click', '.show-recipe-form', authUi.showRecipeForm)
  $('main').on('click', '.show-recipe-update', authEvents.onShowRecipeUpdate)
  $('.overlay').on('click', '.overlay-exit', authUi.closeOverlay)
  $('.overlay').on('submit', '.user-sign-up', authEvents.onSignUp)
  $('.overlay').on('submit', '.user-sign-in', authEvents.onSignIn)
  $('.overlay').on('submit', '.user-change-pw', authEvents.onChangePassword)
  $('.overlay').on('submit', '.recipe-create', authEvents.onCreateRecipe)
  $('.overlay').on('submit', '.recipe-update', authEvents.onUpdateRecipe)
  $('.overlay').on('click', '.show-recipe-delete', authUi.showRecipeDelete)
  $('.confirmation').on('click', '.confirmation-exit', authUi.closeConfirmation)
  $('.confirmation').on('click', '.recipe-delete', authEvents.onDeleteRecipe)
  $('.main-content').on('click', '.recipe-preview-name', authEvents.onShowRecipe)
  $('.main-content').on('click', '.recipe-favorite', authEvents.onCreateFavorite)
  $('.main-content').on('click', '.recipe-unfavorite', authEvents.onDeleteFavorite)
  $('.filter-new').on('click', () => {
    authEvents.onSetOrder('new')
  })
  $('.filter-popular').on('click', () => {
    authEvents.onSetOrder('popular')
  })
  $('.filter-all').on('click', () => {
    authEvents.onSetFilter('')
  })
  $('.filter-favorites').on('click', () => {
    authEvents.onSetFilter('favorites')
  })
  $('.filter-user').on('click', () => {
    authEvents.onSetFilter('user')
  })
})
