// There are two main tools to declare the shape of an object: interfaces and type aliases. They are very similar, and for the most common cases act the same.
// 声明对象形状有两个主要工具: 接口和类型别名。它们非常相似，而且在最常见的情况下，它们的作用也是一样的。
type BirdType = {
  wings: 2;
};

interface BirdInterface {
  wings: 2;
}

const bird1: BirdType = { wings: 2 };
const bird2: BirdInterface = { wings: 2 };

// Because TypeScript is a structural type system, it's possible to intermix their use too.
// 因为 TypeScript 是一个结构化类型系统，所以也可以混合使用它们。

const bird3: BirdInterface = bird1;

// They both support extending other interfaces and types. Type aliases do this via intersection types, while interfaces have a keyword.
// 它们都支持扩展其他接口和类型。类型别名通过交集类型执行此操作，而接口具有关键字。

type Owl = { nocturnal: true } & BirdType;
type Robin = { nocturnal: false } & BirdInterface;

interface Peacock extends BirdType {
  colourful: true;
  flies: false;
}
interface Chicken extends BirdInterface {
  colourful: false;
  flies: false;
}

let owl: Owl = { wings: 2, nocturnal: true };
let chicken: Chicken = { wings: 2, colourful: false, flies: false };

// That said, we recommend you use interfaces over type aliases. Specifically, because you will get better error messages. If you hover over the following errors, you can see how TypeScript can provide terser and more focused messages when working with interfaces like Chicken.
// 也就是说，我们建议您使用接口而不是类型别名。特别是，因为您将获得更好的错误消息。如果将鼠标停留在以下错误上，可以看到 TypeScript 在使用诸如 Chicken 之类的接口时如何提供更简洁、更集中的消息。

owl = chicken;
chicken = owl;

// One major difference between type aliases vs interfaces are that interfaces are open and type aliases are closed. This means you can extend an interface by declaring it a second time.
// 类型别名与接口之间的一个主要区别是，接口是打开的，而类型别名是关闭的。这意味着可以通过第二次声明接口来扩展接口。

interface Kitten {
  purrs: boolean;
}

interface Kitten {
  colour: string;
}

// In the other case a type cannot be changed outside of its declaration.
// 在另一种情况下，类型不能在其声明之外进行更改。

type Puppy = {
  color: string;
};

type Puppy = {
  toys: number;
};

// Depending on your goals, this difference could be a positive or a negative. However for publicly exposed types, it's a better call to make them an interface.
// 根据你的目标，这种差异可能是积极的，也可能是消极的。但是对于公开公开的类型，最好将它们调用为接口。
// One of the best resources for seeing all of the edge cases around types vs interfaces, this stack overflow thread is a good place to start:
// 这个stack overflow线程是查看类型与接口之间所有边界情况的最佳资源之一，它是一个很好的起点:
// https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220
