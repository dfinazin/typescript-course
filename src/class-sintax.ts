class Human {
  date: Date;
  constructor(date: Date) {
    this.date = date ?? new Date();
  }

  isProgrammer(): boolean {
    return false;
  }
}

class User {
  _name: string;
  birthYear: Date;
  _hobbies: string[] = [];
  constructor(name: string, birthYear?: Date) {
    ((this._name = name), (this.birthYear = birthYear ?? new Date()));
  }

  get hobbies(): string[] {
    return this._hobbies;
  }

  set name(newName: string) {
    this._name = newName;
  }

  getHobbies(): string[] {
    return this._hobbies;
  }

  addHobby(hobby: string): void {
    this.hobbies.push(hobby);
  }

  setName(newName: string): this {
    this._name = newName;
    return this;
  }
}

const user = new User("Vladilen", new Date());

class Figure {
  size: number = 10;
  color: string = "red";
  private id: number;
  constructor() {
    this.id = Math.random();
  }
  protected getId(): number {
    return this.id;
  }
}

class Box extends Figure {
  static readonly TYPE = "BOX";
  static logId() {
    console.log(Math.random());
  }
  getInfo() {
    return {
      size: this.size,
      color: this.color,
      id: this.getId(),
    };
  }
}
const box = new Box();

// ---------- Реализация интерфейсов классами ---------- //

interface Lifecycle {
  onInit(): void;
  onDestroy?(flag: boolean): void;
}

interface ComponentOnChange {
  hasChanged: boolean;
  onChange(data: number): boolean;
}

class Component implements Lifecycle, ComponentOnChange {
  hasChanged: boolean = false;
  onChange(data: number): boolean {
    if (data > 0) {
      return true;
    }
    return false;
  }
  onInit(): void {
    console.log("Component on init");
  }
  // onDestroy(flag: boolean): void {
  //   if (flag) {
  //     console.log("Component on destroy");
  //   }
  // }
}

// ---------- Абстрактные классы ---------- //

abstract class Logger {
  abstract log(message: string): void;

  table(data: object): void {
    console.table(data);
  }
}

class MessageLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }
}

const logger = new MessageLogger();
logger.log("Hello");
logger.table({ a: 1, b: 2 });
