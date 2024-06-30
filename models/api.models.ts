import { readFile } from "fs/promises"

function selectEndpoints():Promise<string> {
    return readFile(`${__dirname}/../endpoints.json`, { encoding: "utf8" })
    .then((response)=> {
        console.log(response)
        return response;
    })
}

export {selectEndpoints}