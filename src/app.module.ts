import { AppController } from './app.controller';
import { userProviders } from './users/users.providers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './core/database/database.providers';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/strategy/jwt-strategy';
import { UserDevicesModule } from './userdevices/user-devices.module';
import { DevicesModule } from './devices/devices.module';
import { userDevicesProviders } from './userdevices/user-devices.providers';
import { devicesProviders } from './devices/devices.providers';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
    UsersModule,
    DevicesModule,
    UserDevicesModule,
  ],
  controllers: [AppController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...userDevicesProviders,
    ...devicesProviders,
    AuthService,
    UsersService,
    JwtStrategy,
  ],
})
export class AppModule {}
