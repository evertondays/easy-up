import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import UnAuthorized from 'App/Exceptions/UnAuthorizedException'


export default class AppAuth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    try {
      const userToken = ctx.request.header('user_token')
      const userId = ctx.request.header('user_id')

      await prisma.users.findUnique({
        where: {
          id: userId,
          remember_me_token: userToken
        }})
    } catch {
      throw new UnAuthorized('You are not authorized')
    }

    await next()
  }
}
