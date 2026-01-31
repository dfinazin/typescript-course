// ---------- Простой пример декоратора ---------- //
class User1 {
  isProgrammer?: boolean;
  constructor(public name: string) {}
  sayMyName() {
    console.log(this.name);
  }
}

const makeProgrammer = (user: User1) => {
  user.isProgrammer = true;
  return user;
};

//const user = new User('Vladilen')
const user = makeProgrammer(new User1("Vladilen"));

console.log(user.isProgrammer);
user.sayMyName();

// ---------- Декораторы класса ---------- //

const ClassDecorator = (target: Function) => {
  console.log("ClassDecorator", target);
};
const ClassDecorator2 = (target: Function) => {
  console.log("ClassDecorator2");
};

@ClassDecorator
@ClassDecorator2
class User {
  constructor(public isProgrammer: boolean) {
    console.log("Constructor");
  }
}

const user1 = new User(true);

// ---------- Пример: Декоратор с параметрами ---------- //

interface ComponentProps {
  template: string;
  selector: string;
}

const Component = (props: ComponentProps) => {
  return (constructor: any) => {
    const node = document.querySelector(props.selector);
    const instance = new constructor("Vladilen");
    if (node) {
      node.insertAdjacentHTML("afterbegin", props.template);
      node.querySelector("span")!.textContent = instance.name;
    }
  };
};

@Component({
  selector: "#app",
  template: `
    <h1>This is User Component</h1>
    <h2>User name is <span></span></h2>
  `,
})
class UserComponent {
  constructor(public name: string) {
    console.log("constructor");
  }
}

const user2 = new UserComponent("Vladilen");

// ---------- Декоратор свойств ---------- //

const MaxChildren = (limit: number) => {
  return (target: Object, key: string | symbol) => {
    let value: number;
    const get = () => value;
    const set = (newValue: number) => {
      if (newValue > limit) {
        value = limit;
        console.log("Вы привысили лимит. Максимум детей: ", limit);
      } else {
        value = newValue;
      }
    };
    Object.defineProperty(target, key, { get, set });
  };
};

class UserParent {
  @MaxChildren(10)
  children: number;

  constructor(children: number) {
    this.children = children;
  }
}

const userParent = new UserParent(100);

// ---------- Декоратор методов ---------- //

const Autobind = (
  target: any,
  name: string,
  descriptor: PropertyDescriptor,
) => {
  const newDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      descriptor.value.bind(this);
    },
  };
};

class UserProps {
  constructor(public name: string) {}

  @Autobind
  sayMyName() {
    console.log(this?.name);
  }
}

const userProps = new UserProps("Vladilen");

const nameSayer = (fn: Function) => {
  fn();
};

nameSayer(user.sayMyName);
