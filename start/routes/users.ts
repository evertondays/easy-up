import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'UserController.index')
  Route.post('', 'UserController.post')
}).prefix('api/users')
