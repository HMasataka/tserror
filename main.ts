// @ts-ignore
import { Result, Success, Failure } from "./errors.ts";

function foo(): Result<string, Error> {
  return new Success("success");
}

function bar(): Result<string, Error> {
  return new Failure(new Error("bar"));
}

(() => {
  const result = foo();

  if (result.isFailure()) {
    console.log(result.error);
    return;
  }

  console.log(result.value);
})();
