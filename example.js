const outerFn = () => {
    const x = 5;
    const innerFn = () => console.log(x);
    return innerFn;
};

const closureTest = outerFn();
console.log(closureTest);
closureTest();
console.dir(closureTest);