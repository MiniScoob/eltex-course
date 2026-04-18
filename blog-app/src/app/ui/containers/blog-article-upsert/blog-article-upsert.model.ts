type ValidatorConfig = {
  key: string;
  validator: any;
  error: string | ((err: any) => string);
};

export type FormConfig<T> = {
  [K in keyof T]: {
    initial: T[K];
    validators: ValidatorConfig[];
  };
};
