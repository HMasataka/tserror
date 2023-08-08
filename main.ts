// @ts-ignore
import { Result, Success, Failure, tryCatch } from "./errors.ts";

function foo(): Result<string, Error> {
  return new Success("success");
}

function bar(): Result<string, Error> {
  return new Failure(new Error("bar"));
}

function hoge(): string {
  throw new Error("foo");
}

function piyo(message: string): string {
  throw new Error(message);
}

(() => {
  const result = foo();

  if (result.isFailure()) {
    console.log(result.error);
    return;
  }

  console.log(result.value);
})();

(() => {
  const message = "message";

  const result = tryCatch(
    () => {
      return piyo(message);
    },
    (e: unknown) => {
      return e as Error;
    }
  );

  if (result.isFailure()) {
    console.log(result.error);
    return;
  }

  console.log(result.value);
})();
