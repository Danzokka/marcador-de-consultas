import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthUserDto, CreateUserDto } from './dto/CreateUserDto';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  generateSaltAndHash(password: string) {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString(
        'hex',
      );
      return `${salt}&${hash}`;
    } catch (e) {
      throw new BadRequestException('Error generating password hash');
    }
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: user.email }, { cpf: user.cpf }],
        },
      });

      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      user.password = this.generateSaltAndHash(user.password);

      const createdUser = await this.prisma.user.create({
        data: user,
      });

      delete createdUser.password;
      return createdUser;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new BadRequestException(e.message || 'Error creating user');
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      delete user.password;
      return user;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new BadRequestException('Error retrieving user');
    }
  }

  async updateUser(id: number, user: CreateUserDto): Promise<User> {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      user.password = this.generateSaltAndHash(user.password);

      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: user,
      });

      delete updateUser.password;
      return updateUser;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new BadRequestException('Error updating user');
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      delete user.password;
      return user;
    } catch (e) {
      throw new BadRequestException('Error deleting user');
    }
  }

  async auth(user: AuthUserDto): Promise<User> {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      // Split stored password into salt and stored hash
      const [salt, storedHash] = dbUser.password.split('&');

      // Generate hash with provided password and retrieved salt
      const computedHash = pbkdf2Sync(
        user.password,
        salt,
        100000,
        64,
        'sha512',
      ).toString('hex');

      // Compare the computed hash with the stored hash
      if (computedHash === storedHash) {
        delete dbUser.password;
        return dbUser;
      } else {
        throw new BadRequestException('Authentication failed');
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new BadRequestException('Authentication failed');
    }
  }
}
