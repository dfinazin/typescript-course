//  ----  Числа  --------

let sum = (a: number, b: number) => {
  return a + b;
};

let n1: number = 40;
const n2: number = 2;

let a = 12;
let b = Infinity;
let c = NaN;
let d = 0x1;
let e = 1.2;
let f: 24 = 24;

console.log(sum(n1, n2));

//  ----  Строки, boolean  --------

let string = "Hello TypeScript";

const transform = (str: string, uppercase: boolean): string => {
  if (uppercase) {
    return str.toUpperCase();
  }
  return str.toLowerCase();
};

let isUppercase = true;
transform(string, isUppercase);

//  ----  Объекты  --------

const person: {
  name: string;
  age: number;
  surname: string;
  address: { city: string; street?: string };
} = {
  name: "Vladilen",
  age: 29,
  surname: "Minin",
  address: {
    city: "Moscow",
    street: "Lenina", // ? - необязательное поле
  },
};

const fullname = (name: string, surname: string): string => {
  return name + " " + surname;
};

const otherFullName = (obj: { name: string; surname: string }): string => {
  return obj.name + " " + obj.surname;
};

console.log(fullname(person.name, person.surname));
console.log(otherFullName(person));

//  ----  Массивы  --------

const names: string[] = ["vladilen", "Elena", "Ivan"];

names.push("eva");
//names.push(true) // ошибка

for (let name of names) {
  console.log(name.toUpperCase());
}

const result_array = names
  .filter((name) => name !== "ivan")
  .map((name) => name.length)
  .reduce((acc, cur) => (acc += cur), 0);

console.log(result_array);

//  ----  Картежи  --------

//const [state, setState] = React.useState(100)  //Пример из реакта
//const tuple: any[] = [100,'i am string']; Не правильно потому что разрешает любые типы данных
//const tuple = [100,'i am string']; // может содержать строки и числа в любом количестве (не подходит для ситуации ниже)
const tuple: readonly [number, string] = [100, "i am string"];
//tuple[0] = 'typescript' //вызывае ошибку поскольку первый элемент в картеже должен быть числом
//const temp = tuple[2] //вызывает ошибку об отсутствии в картеже элемента с индексом 2
//tuple.push('false') //если указан параметр "readonly" нельзя добавлять новые элементы в картеж
const tuple2: [boolean, string, ...number[]] = [true, "hello", 1, 2, 3];

//  ----  Enum  --------

enum Roles {
  admin, // если значение не задано то начинается с "0"
  user,
}

const person1 = {
  //role: 'admin',
  role: Roles.admin,
};
const person2 = {
  //role: 'user',
  role: Roles.user,
};

const check = (person: { role: Roles }) => {
  if (person.role === Roles.admin) {
    console.log("user is admin");
  } else {
    console.log("user is user");
  }
};

const temp = {
  role: "Jedi",
};

check(person1);
check(person2);
//check(temp) При использовании enum перечень доступных значений ограничен заданными в enum

// ----  Символы, bigInt  --------

let symbolA: symbol = Symbol("A");
let symbolB: symbol = Symbol("B");

console.log(symbolA === symbolB);

const big1 = 123n; // bigint обозначается через добавление "n" в конце числа
const big2 = BigInt(200); // или так

// ---- void, undefined  -------

const sameFunc = (message: string): void => {
  // void - функция ничего не возвращает
  console.log(message);
};

let temp2: undefined; // undefined - переменная не определена

// ----  Функции дополнение  --------

const logg = (data: any): void => {
  console.log(data);
}; // (data: any) => void - можно не указывать тип возвращаемого значения, если оно не используется, но лучше это делать

const summ = (a: number, b: number): number => {
  return a + b;
};

let fn: (a: number, b: number) => number;

fn = summ;
// fn = logg // если функция типизирована то записать в нее можно только ту функцию которая соответствует типу

const summ2 = (a: number, b: number, callback: (d: any) => void): number => {
  const result = a + b;
  callback(result);
  return result;
};
let fn2: (n1: number, n2: number, cb: (d: any) => void) => number;

fn2 = summ2;
fn2(1, 2, logg);
