import { ClassType, Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInputs";

function createBaseResolver<T extends ClassType, Y extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: Y,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver extends inputType {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

const CreateUser = createBaseResolver("User", User, RegisterInput, User);

// tslint:disable-next-line: max-classes-per-file
@Resolver()
export class CreateUserResolver extends CreateUser {
  // @Mutation(() => returnType, { name: `create${suffix}` })
  // async create(@Arg("data", () => inputType) data: any){
  //   return entity.create(data).save()
}

// for Returnin just as Resolver
// function createBaseResolver<T extends ClassType, Y extends ClassType>(
//   suffix: string,
//   returnType: T,
//   inputType: Y,
//   entity: any
// ) {
//   @Resolver()
//   class BaseResolver extends inputType {
//     @Mutation(() => returnType, { name: `create${suffix}` })
//     async create(@Arg("data", () => inputType) data: any){
//       return entity.create(data).save()
//     }
//   }

//   return BaseResolver;
// }

// export const CreateUser = createBaseResolver("User", User, RegisterInput, User);
