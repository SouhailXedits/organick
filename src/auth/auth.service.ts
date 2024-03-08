import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/singin-dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { comparePassword, cryptPassword } from 'src/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(signIndto: SignInDTO): Promise<any> {
    const user = await this.userService.findOneByEmail(signIndto.email);
    const isCorrectPassword = await comparePassword(signIndto.password,user.password);
    if (user && isCorrectPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser({ email, password });
    if (!user) {
      return null;
    }
    return user;
  }

  async signUp(signUpDto: CreateUserDTO) {
    const hashedPassword = await cryptPassword(signUpDto.password);
    signUpDto.password = hashedPassword;
    return this.userService.create(signUpDto);
  }
}
