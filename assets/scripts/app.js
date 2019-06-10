'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const authUi = require('./auth/ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.loggedOut()
  $('.user-auth').on('click', '.show-sign-up', authUi.showSignUp)
  $('.user-auth').on('click', '.show-sign-in', authUi.showSignIn)
  $('.user-auth').on('click', '.show-change-pw', authUi.showChangePassword)
  $('.user-auth').on('click', '.user-sign-out', authEvents.onSignOut)
  $('main').on('click', '.show-recipe-form', authUi.showRecipeForm)
  $('.overlay').on('click', '.overlay-exit', authUi.closeOverlay)
  $('.overlay').on('submit', '.user-sign-up', authEvents.onSignUp)
  $('.overlay').on('submit', '.user-sign-in', authEvents.onSignIn)
  $('.overlay').on('submit', '.user-change-pw', authEvents.onChangePassword)
  $('.overlay').on('submit', '.recipe-create', authEvents.onCreateRecipe)
})
