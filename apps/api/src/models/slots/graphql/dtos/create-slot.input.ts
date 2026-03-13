import { InputType, OmitType } from '@nestjs/graphql'
import { Slot } from '../entity/slot.entity'

@InputType()
export class CreateSlotInput extends OmitType(Slot, ['id', 'createdAt', 'updatedAt'], InputType) { }

@InputType()
export class CreateSlotInputWithoutGarageId extends OmitType(
    CreateSlotInput,
    ['garageId'],
    InputType,
) {
    count: number
}