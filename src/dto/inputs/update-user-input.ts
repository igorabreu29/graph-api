import { Field, InputType } from 'type-graphql'
import { IsEmail, MinLength, MaxLength } from 'class-validator'

@InputType()
export class UpdateUserInput {
    @MinLength(3)
    @Field(() => String!)
    name: string
    
    @Field(() => String!)
    @IsEmail()
    email: string
    
    @Field(() => String!)
    @MinLength(6)
    @MaxLength(20)
    password: string
}