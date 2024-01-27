import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'UserController.index')
}).prefix('api/users').middleware('app_auth')

Route.post('api/users', 'UserController.post')
Route.post('api/login', 'UserController.login')
