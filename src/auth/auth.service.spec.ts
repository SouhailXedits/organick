import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersServiceMock: Partial<UsersService>;
  let jwtServiceMock: Partial<JwtService>;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(async () => {
    usersServiceMock = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtServiceMock = {
      sign: jest.fn(),
    };

    configServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('validateUser', () => {
  //   it('should return user if credentials are correct', async () => {
  //     const mockUser = {
  //       id: 1,
  //       email: 'test@example.com',
  //       password: 'password123',
  //     };
  //     usersServiceMock.findOneByEmail.mockResolvedValue(mockUser);
  //     const signInDto = { email: 'test@example.com', password: 'password123' };
  //     await expect(service.validateUser(signInDto)).resolves.toEqual({
  //       id: 1,
  //       email: 'test@example.com',
  //     });
  //   });

  //   it('should throw BadRequestException if credentials are incorrect', async () => {
  //     usersServiceMock.findOneByEmail.mockResolvedValue(null);
  //     const signInDto = { email: 'test@example.com', password: 'password123' };
  //     await expect(service.validateUser(signInDto)).rejects.toThrow(
  //       BadRequestException,
  //     );
  //   });
  // });

  // Add similar tests for other methods like generateAccessToken, generateRefreshToken, signIn, signUp
});
