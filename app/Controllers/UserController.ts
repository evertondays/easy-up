import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateUserValidator, LoginValidator } from 'App/Validators/UserSchema'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import argon2 from 'argon2'

export default class UserController {
  public async index(ctx: HttpContextContract) {
    const users = await prisma.users.findMany()
    return users
  }

  public async post(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateUserValidator)

    const password = await argon2.hash(payload.password)
    await prisma.users.create({ data: { ...payload, password: password } })

    return ctx.response.status(201)
  }

  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(LoginValidator)

    const user = await prisma.users.findFirst({ where: { email: payload.email } })
    if (!user) return ctx.response.status(404)

    try {
      if (await argon2.verify(user.password, payload.password)) {
        const token = this.generateToken(64)
        await prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            remember_me_token: token,
          },
        })
      }
    } catch (err) {
      return ctx.response.status(500)
    }
  }

  private generateToken(n) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var token = ''
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)]
    }
    return token
  }
}
