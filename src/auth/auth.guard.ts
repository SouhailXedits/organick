import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private jwtConstants = {
    secret: this.configService.get<string>('secret_key'),
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token)
    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConstants.secret,
      });

      const isAccessTokenExpired = this.isTokenExpired(payload.exp);
      console.log(isAccessTokenExpired)


      const refreshToken = this.extractRefreshTokenFromHeader(request);
      console.log(refreshToken)
      if (isAccessTokenExpired && refreshToken) {
        // Implement logic to validate the refresh token
        const isRefreshTokenValid = this.isValidRefreshToken(refreshToken);
        if (isRefreshTokenValid) {
          // Generate new access token using refresh token
          const newAccessToken = this.generateAccessToken(payload.user);
          // Assign the new access token to the request
          request.accessToken = newAccessToken;
        }
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [type, token] = authorizationHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }
    return undefined;
  }

  private extractRefreshTokenFromHeader(request: Request): string | undefined {
    return request.headers['x-refresh'] as string;
  }

  private isTokenExpired(expirationTime: number): boolean {
    return Date.now() >= expirationTime * 1000;
  }

  private isValidRefreshToken(refreshToken: string): boolean {
    return true; 
  }

  private generateAccessToken(user) {
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
}
