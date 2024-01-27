import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone'

export default class UnAuthorizedException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(403).send(error.message)
  }
}
