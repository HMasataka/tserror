// @ts-ignore
import { Result, Success, Failure, tryCatch, tryCatchAsync } from "./errors.ts";

function foo(): Result<string, Error> {
  return new Success("success");
}

function bar(): Result<string, Error> {
  return new Failure(new Error("bar"));
}

function hoge(message: string): string {
  throw new Error(message);
}

async function piyo(): Promise<string> {
  return "piyo";
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
      return hoge(message);
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

(async () => {
  const result = await tryCatchAsync(piyo, (e: unknown) => {
    return e as Error;
  });

  if (result.isFailure()) {
    console.log(result.error);
    return;
  }

  console.log(result.value);
})();
