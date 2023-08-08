// @ts-ignore
import { tryCatch } from "../errors.ts";

function hoge(message: string): string {
  throw new Error(message);
}

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
