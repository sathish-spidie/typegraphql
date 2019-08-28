import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import faker from "faker";
import { User } from "../../../entity/User";

beforeEach(() => {
  jest.setTimeout(10000);
});

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const createMutation = `
{
    me{
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Testing me Query", () => {
  it("get a user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    const response = await gCall({
      source: createMutation,
      userId: user.id
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });

    expect(response).toBeDefined();
    expect(response.data!.me.confirmed).toBeFalsy();
    expect(response.data!.me.firstName).toBe(user.firstName);

    const response2 = await gCall({
      source: createMutation
    });

    expect(response2).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
