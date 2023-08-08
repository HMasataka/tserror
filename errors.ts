export type Result<T, E extends Error> = Success<T> | Failure<E>;
export type PromiseResult<T, E extends Error> = Promise<Result<T, E>>;

export class Success<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure<Error> {
    return false;
  }
}

export class Failure<E extends Error> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isSuccess(): this is Success<unknown> {
    return false;
  }

  isFailure(): this is Failure<E> {
    return true;
  }
}

export function tryCatch<T, E extends Error>(
  func: () => T,
  // 発生する例外は any なので適切な型に変換するための関数を与える。
  onCatch: (e: unknown) => E
): Result<T, E> {
  try {
    const value = func();
    return new Success<T>(value);
  } catch (err) {
    return new Failure<E>(onCatch(err));
  }
}

export async function tryCatchAsync<T, E extends Error>(
  func: () => Promise<T>,
  // 発生する例外は any なので適切な型に変換するための関数を与える。
  onCatch: (e: unknown) => E
): PromiseResult<T, E> {
  try {
    const value = await func();
    return new Success<T>(value);
  } catch (err) {
    return new Failure<E>(onCatch(err));
  }
}
