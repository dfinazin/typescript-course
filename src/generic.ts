const array: Array<string> = ["a", "b", "c"];
const array2: Array<number> = [1, 2, 3];

const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("done");
  });
});

promise.then((data) => {
  data.length;
});

// ---------- Функции ---------- //

const double = <T>(array: T[]): T[] => {
  return array.concat(array);
};

const fill = <T>(array: any[], value: T): T[] => {
  return array.fill(value);
};

const res1 = double(["a", "b", "c"]);
const res2 = double([1, 2, 3]);
const res3 = fill(["a", "b", "c"], 1);
const res4 = fill([1, 2, 3], false);

res1.map((item) => item.toUpperCase());
res2.map((item) => item.toFixed());

const merge = <T, R>(a: T, b: R): T & R => {
  return Object.assign({}, a, b);
};

const res5 = merge({ a: 1 }, { b: 2, c: { d: 3 } });

// ---------- Ограничения дженериков ---------- //

const log = <T extends string | number>(data: T): T => {
  console.log(data);
  return data;
};

let res6 = <string>log("I am string");
let res7 = log(42) as number;
//let res8 = log(false) // error

// ---------- Оператор keyof ---------- //

const obj = { a: 1, b: 2, c: "a", key: 42 };
const obj2 = { test: 100 };

const getValue = <T extends object, R extends keyof T>(obj: T, key: R) => {
  return obj[key];
};

const res9 = getValue(obj, "b");
const res10 = getValue(obj2, "test");

// ---------- Классы и дженерики ---------- //

class Collection<T extends number | string> {
  constructor(private _items: T[]) {}
  add(value: T) {
    this._items.push(value);
  }
  get items(): T[] {
    return this._items;
  }
}

const col1 = new Collection<number>([1, 2, 3]);
col1.add(4);

const col2 = new Collection<string>(["a", "b"]);
col2.add("c");

col1.items.map((item) => item.toString());

class List<R> extends Collection<string> {
  constructor(public type: R) {
    super(["a"]);
  }
}

const list1 = new List("qwerty");
const list2 = new List(true);

const obj3 = { a: 1, b: 2, c: 3 };

const getValue1 = <T extends object, R extends keyof T>(obj: T, key: R) => {
  return obj[key];
};

getValue1(obj3, "b");
