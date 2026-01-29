interface User {
  id?: number;
  age: number;
  name: string;
}

// ---------- keyof, typeof ---------- //

type UserKey = keyof User;

const key: UserKey = "name";

const str1: string = "hello";

type MyString = typeof str1;

const user: User = { age: 29, name: "Vladilen" };

type UserKey2 = keyof typeof user;

const key2: UserKey2 = "name";

// ---------- Partial, Required, Readonly ---------- //

const createAndValidate = (name: string, age: number): User => {
  const newUser: Partial<User> = {};
  if (name.length !== 0) {
    newUser.name = name;
  }
  if (name.length !== 0) {
    newUser.name = name;
  }
  return newUser as User;
};

const user1: Readonly<User> = { age: 18, name: "Elena" };
// user1.name = 'igor' //Error

type RequiredUser = Required<User>;

const user2: RequiredUser = {
  id: 1,
  name: "Igor",
  age: 25,
};

// ---------- Omit, Pick, Extract, Exclude ---------- //

type UserData1 = Omit<User, "age">;
type UserData2 = Pick<User, "id" | "name">;

type User1 = Extract<"age" | "some" | "id", keyof User>;
type User2 = Exclude<"age" | "some" | "id", keyof User>;

// ---------- ReturnType, Paramrters, ConstructorParameters ---------- //

const log = (data: string[], num: number): boolean => {
  console.log(data, num);
  return false;
};

type logReturn = ReturnType<typeof log>;
type logParams = Parameters<typeof log>;
type logParams1 = Parameters<typeof log>[0];

class UserClass {
  constructor(
    public name: string,
    public age?: number,
  ) {}
}

type UserParams = ConstructorParameters<typeof UserClass>;
type UserParams2 = ConstructorParameters<typeof UserClass>[1];
type UserParams_2 = Required<ConstructorParameters<typeof UserClass>>[1];
