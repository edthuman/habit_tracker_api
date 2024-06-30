import app from "./app"

app.listen("9090", () => {
    console.log(`Listening on 9090`);
  }).on("err", (error) => {
    throw new Error(error.message)
});