export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (useSystemStore().pwd !== 'pims#1234')
    return navigateTo('/')
})
