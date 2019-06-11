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

const updateRecipe = (id, name) => $.ajax({
  url: `${config.apiUrl}/recipes/${id}`,
  method: 'PATCH',
  data: {recipe: {
    name: name
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const updateIngredient = (id, name, amount) => $.ajax({
  url: `${config.apiUrl}/ingredients/${id}`,
  method: 'PATCH',
  data: {ingredient: {
    name: name,
    amount: amount
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const updateStep = (id, title, instructions) => $.ajax({
  url: `${config.apiUrl}/steps/${id}`,
  method: 'PATCH',
  data: {step: {
    title: title,
    instructions: instructions
  }},
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const deleteRecipe = id => $.ajax({
  url: `${config.apiUrl}/recipes/${id}`,
  method: 'DELETE',
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

const deleteFavorite = id => $.ajax({
  url: `${config.apiUrl}/favorites/${id}`,
  method: 'DELETE',
  headers: {
    Authorization: `Token ${store.userAuth.token}`
  }
})

const showCook = () => $.ajax({
  url: `${config.apiUrl}/cooks/${store.userData.cook.id}`
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
  updateRecipe,
  updateIngredient,
  updateStep,
  deleteRecipe,
  indexRecipes,
  showRecipe,
  createFavorite,
  deleteFavorite,
  showCook
}
