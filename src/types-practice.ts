//  ----  Объединения  --------

const compute = (p1: number | string, p2: number | string): number | string => {
  if (typeof p1 === "number" && typeof p2 === "number") {
    return p1 + p2;
  }
  return p1.toString() + " " + p2.toString();
};

console.log(compute(4, 5));
console.log(compute("Hello", "world!"));

const logError = (err: string | string[]): string | void => {
  if (Array.isArray(err)) {
    return err.reduce((acc, cur) => (acc += " " + cur));
  } else {
    console.log(err);
  }
};

// ----  Литералы  --------

type OutputType = "text" | "json";

const convert = (data: object, type: OutputType) => {
  // литеральный объединенный тип ограничивает только возможные значения
  if (type === "text") {
    return JSON.stringify(data);
  } else if (type === "json") {
    return { ...data };
  }
};

convert({ a: 1 }, "text");

// ----  Интерфейсы  --------

/* type User = { // объекты лучше типизировать с помощью интерфейсов
    name: string,
    age: number,
    hobbies: string[],
} */

type callbackFn = (data: string) => void; // Для типизации простых однострочных переменных лучше подходит "type"

interface User {
  name: string;
  age: number;
  hobbies: string[];
}

interface Address {
  city: string;
  country: string;
  postalCode: number;
}

interface FullUser extends User, Address {
  date: Date;
}

const person: FullUser = {
  name: "Vladilen",
  age: 29,
  hobbies: ["Sports", "Cooking"],
  city: "Moscow",
  country: "Russia",
  postalCode: 12345,
  date: new Date(),
};

interface UserMap {
  [key: number]: FullUser;
  date?: Date;
}

const userMap: UserMap = {
  1: person,
  2: person,
  3: person,
};

const userMap2 = {
  1: person,
  2: person,
  3: person,
} as UserMap;

// ----  unknown  --------

let a: unknown = 42; // Заранее неизвестный тип данных, такой тип можно затать тольео принудительно
let b = a === 123; // данный тип работает с операторами: == === || && ? !
//let c = a + 10 // данный тип не работает с операторами: + - * /
if (typeof a === "number") {
  let c = a + 10; // данный тип работает с операторами: + - * / при наличии предварительной проверки
}

// ----  never  --------
// для бесконечных функций чтоб не вывалить ошибку

const throwError = (message: string): never => {
  throw new Error(message);
};

const infiniteLoop = (): never => {
  while (true) {
    console.log("Hello");
  }
};

const rec = (): never => {
  return rec();
};

// ----  Защитники типа  --------

const isBoolean = (val: string | boolean): val is boolean => {
  return typeof val === "boolean";
};

const isString = (val: string | boolean): val is string => {
  return typeof val === "string";
};

const logFlag = (flag: string | boolean) => {
  if (isBoolean(flag)) {
    console.log("This is boolean");
  } else if (isString(flag)) {
    console.log("This is string");
  }
};

logFlag(true);
