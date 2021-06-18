import { InputType, Field } from "type-graphql";
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;

  // Проверка на подверждение
  @Field()
  password_confitm: string;
}
