import { useSearchParams } from "react-router-dom";

export const useTableQuery = (prefix: string) => {
  const [params, setParams] = useSearchParams();

  const get = (key: string, defaultValue?: string) => {
    return params.get(`${prefix}_${key}`) || defaultValue;
  };

  const set = (values: Record<string, string>) => {
    const newParams = new URLSearchParams(params);

    Object.entries(values).forEach(([key, value]) => {
      newParams.set(`${prefix}_${key}`, value);
    });

    setParams(newParams);
  };

  return { get, set, params };
};
