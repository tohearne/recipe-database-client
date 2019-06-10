'use strict'

const config = require('../config')
const store = require('../store')

const signUp = formData => $.ajax({
  url: `${config.apiUrl}/sign-up`,
  method: 'POST',
  data: formData
})

const createCook = cookName => $.ajax({
  url: `${config.apiUrl}/cooks`,
  method: 'POST',
  data: {cook: {
    name: cookName,
    user_id: store.userAuth.id
  }}
})

const getUserData = () => $.ajax({
  url: `${config.apiUrl}/users/${store.userAuth.id}`,
  method: 'GET',
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const signIn = formData => $.ajax({
  url: `${config.apiUrl}/sign-in`,
  method: 'POST',
  data: formData
})

const changePassword = formData => $.ajax({
  url: `${config.apiUrl}/change-password`,
  method: 'PATCH',
  data: formData,
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const signOut = formData => $.ajax({
  url: `${config.apiUrl}/sign-out`,
  method: 'DELETE',
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

module.exports = {
  signUp,
  createCook,
  getUserData,
  signIn,
  changePassword,
  signOut
}
