import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { configuration, validationSchema } from './../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinesModule } from './vaccines/vacunas.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PersonModule } from './person/person.module';
import { JwtStrategy } from './users/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `config/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },

      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '20h' },
    }),
    VaccinesModule,
    LaboratoryModule,
    DoctorsModule,
    PersonModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
