// @ts-ignore
import { tryCatchAsync } from "../errors.ts";

async function piyo(): Promise<string> {
  return "piyo";
}

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
