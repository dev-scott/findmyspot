import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from './users/users.module';
@Module({


  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer'
      }
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
