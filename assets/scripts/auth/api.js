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

const createRecipe = name => $.ajax({
  url: `${config.apiUrl}/recipes`,
  method: 'POST',
  data: {recipe: {
    name: name,
    cook_id: store.userData.cook.id
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const createIngredient = (name, amount, id) => $.ajax({
  url: `${config.apiUrl}/ingredients`,
  method: 'POST',
  data: {ingredient: {
    name: name,
    amount: amount,
    recipe_id: id
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const createStep = (title, instructions, id) => $.ajax({
  url: `${config.apiUrl}/steps`,
  method: 'POST',
  data: {step: {
    title: title,
    instructions: instructions,
    recipe_id: id
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const indexRecipes = () => $.ajax({
  url: `${config.apiUrl}/recipes`
})

const showRecipe = id => $.ajax({
  url: `${config.apiUrl}/recipes/${id}`
})

const createFavorite = id => $.ajax({
  url: `${config.apiUrl}/favorites`,
  method: 'POST',
  data: {favorite: {
    user_id: store.userAuth.id,
    recipe_id: id
  }},
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
  signOut,
  createRecipe,
  createIngredient,
  createStep,
  indexRecipes,
  showRecipe,
  createFavorite
}
