interface ConfigObject {
  [key: string]: ConfigValue;
}

type ConfigValue =
  | string
  | number
  | boolean
  | ConfigObject
  | ConfigValue[]
  | null
  | undefined;

export type { ConfigObject, ConfigValue };
