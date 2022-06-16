export interface extendErrorParams extends Error {
  code: number,
}

export const createError = (message: string, stack?: string) => {
  const error: extendErrorParams = {
    message,
    stack,
    name: 'custom',
    code: 404,
  };
  return error;
};

