import { Injectable } from '@nestjs/common'
import { add } from '@findmyspot/sample-lib'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + add(1, 5)
  }
}
