import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./createUserDTO"
import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/IMailProvider"

export class CreateUserUseCase{

  constructor(private usersRepository:IUsersRepository, private mailProvider:IMailProvider){

  }

  async execute(data: ICreateUserRequestDTO){
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if(userAlreadyExists){
      throw new Error("User already exists.")
    }

    const user = new User(data)

    await this.mailProvider.sendEmail({
      to:{
        name:data.name,
        email:data.email
      },
      from: {
        name: "Equipe do meu app",
        email: "Email da equipe do meu app",

      },
      subject: "Seja bem-vindo a plataforma",
      body:'<p>Você já pode fazer o login em nossa plataforma</p>'
    })

    await this.usersRepository.save(user)
  }
}