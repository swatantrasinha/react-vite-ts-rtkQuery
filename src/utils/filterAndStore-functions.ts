export const filterAndStore= (objArray: {label:string, value: string}[]) => {
    const result: string[]  = [];

    objArray.map(ele => {
        result.push(ele.value);
    })
    return result;
}