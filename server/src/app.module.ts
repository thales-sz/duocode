import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { GroqApiGateway } from './gateway/groq-ai.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASS: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    QuestionModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [GroqApiGateway],
})
export class AppModule {}
