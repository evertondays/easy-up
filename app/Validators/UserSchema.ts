import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.trim(), rules.email()]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {}
}

export class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.trim(), rules.email()]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {}
}