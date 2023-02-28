interface al {
  name: string;
}

interface bl extends al{
  age: number;
}

interface cl extends bl {
  high: boolean;
}


let a: cl;
let b: al;

b = a;
