import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateUserValidator } from 'App/Validators/UserSchema'
import { PrismaClient } from '@prisma/client'

export default class UserController {
  public async index() {
    const prisma = new PrismaClient()
    const allUsers = await prisma.user.findMany()

    return allUsers
  }

  public async post(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateUserValidator)

    const prisma = new PrismaClient()
    await prisma.user.create({ data: payload })

    return ctx.response.status(201)
  }
}
