import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/singin-dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { comparePassword, cryptPassword } from 'src/utils/bcrypt.utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(signIndto: SignInDTO): Promise<any> {
    const user = await this.userService.findOneByEmail(signIndto.email);
    const isCorrectPassword = await comparePassword(
      signIndto.password,
      user.password,
    );
    if (user && isCorrectPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException('Wrong email or password ! ', {
      cause: new Error(),
    });
  }

  generateAccessToken(user) {
    const accessTokenExp = this.configService.get<string>('accessTokenExp');
    const secret_key = this.configService.get<string>('secret_key');
    const payload = {
      name: user.name,
      sub: user.id,
      role: user.role,
      image: user.image,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: secret_key,
      expiresIn: accessTokenExp,
    });
  }

  generateRefreshToken(user) {
    const payload = {
      name: user.name,
      sub: user.id,
      role: user.role,
      image: user.image,
      email: user.email,
    };
    const refreshTokenExp = this.configService.get<string>('refreshTokenExp');
    const secret_key = this.configService.get<string>('secret_key');
    const refreshToken = this.jwtService.sign(payload, {
      secret: secret_key,
      expiresIn: refreshTokenExp,
    });
    return refreshToken;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.validateUser({ email, password });
    if (!user) {
      return null;
    }
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { user, accessToken, refreshToken };
  }

  async signUp(signUpDto: CreateUserDTO) {
    const hashedPassword = await cryptPassword(signUpDto.password);
    signUpDto.password = hashedPassword;
    const newUser = await this.userService.create(signUpDto);
    const accessToken = this.generateAccessToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);
    return { user: newUser, accessToken, refreshToken };
  }


  async signOut() {
    return {
      refreshToken: null,
      accessToken: null,
    }
  }
}
