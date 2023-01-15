import { AppController } from './app.controller';
import { userProviders } from './users/users.providers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './core/database/database.providers';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/strategy/jwt-strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES
      }
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [...databaseProviders, ...userProviders, AuthService, JwtStrategy],
})
export class AppModule {}
