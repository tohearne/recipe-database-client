'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.onLoad()
  $('.user-sign-up').on('submit', authEvents.onSignUp)
  $('.user-sign-in').on('submit', authEvents.onSignIn)
  $('.user-change-pw').on('submit', authEvents.onChangePassword)
  $('.user-sign-out').on('submit', authEvents.onSignOut)
  $('.recipe-create').on('submit', authEvents.onCreateRecipe)
})
