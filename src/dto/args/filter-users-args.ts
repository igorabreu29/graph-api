import { ArgsType, Field, Int } from "type-graphql";
import { IsNumber } from 'class-validator'

@ArgsType()
export class FilterUsersArgs {
    @Field(() => Int!, { defaultValue: 1 })
    @IsNumber()
    page: number

    @Field(() => String!, { nullable: true })
    search?: string
}