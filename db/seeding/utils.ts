exports.createRef = (array: any[], key: string, value: string) => {
    const returnObject: any = {}

    array.forEach((element) => {
        if (element[key] !== undefined && element[value] !== undefined && returnObject[element[key]] === undefined){
            returnObject[element[key]] = element[value]
        }
    })

    return returnObject;
}