/* eslint-disable react-hooks/exhaustive-deps */
import { useSetState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import z from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useUrlState<Z extends z.ZodObject<any>>(
  zodSchema: Z,
  postfix: string
): [z.infer<Z>, (value: Partial<z.infer<Z>>) => void] {
  const router = useRouter();

  const [internalState, setinternalState] = useSetState(zodSchema.parse({}));

  useEffect(() => {
    if (!router.isReady) return;

    const { query } = router;

    const keysWithPostfix = Object.keys(query).filter((key) =>
      key.startsWith(postfix)
    );

    const parsedQuery = keysWithPostfix.reduce((acc, key) => {
      const keyWithoutPostfix = key.replace(`${postfix}-`, '');
      return {
        ...acc,
        [keyWithoutPostfix]: query[key],
      };
    }, {});

    setinternalState(zodSchema.parse(parsedQuery));
  }, [router.isReady, router.query]);

  const setState = (rawValue: Partial<z.infer<Z>>) => {
    const addPostfix = (key: string) => `${postfix}-${key}`;

    const objWithAddedPostfix = Object.keys(rawValue).reduce(
      (acc, key) => ({
        ...acc,
        [addPostfix(key)]: rawValue[key],
      }),
      {}
    );

    void router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...objWithAddedPostfix,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return [internalState, setState];
}

const numberUrlZod = (
  defaultVal: number,
  opt?: { min?: number; max?: number }
) =>
  z
    .string()
    .transform((val) => {
      const parsed = Number(val);

      if (Number.isNaN(parsed)) return defaultVal;

      if (opt?.min && parsed < opt.min) return opt.min;

      if (opt?.max && parsed > opt.max) return opt.max;

      return parsed;
    })
    .default(String(defaultVal));

const boolUrlZod = (defaultVal: boolean) =>
  z
    .string()
    .transform((val) => val === 'true')
    .default(String(defaultVal));

const stringUrlZod = (defaultt: string) => z.string().default(String(defaultt));

export { useUrlState, numberUrlZod, boolUrlZod, stringUrlZod };
