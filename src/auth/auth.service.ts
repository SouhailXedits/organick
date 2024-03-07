import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    console.log(user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      return null;
    }
    return user;
  }
}
