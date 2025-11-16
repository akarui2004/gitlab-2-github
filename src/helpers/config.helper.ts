import type { ConfigObject, ConfigValue } from "@/types";
import { resolveBase } from "./dir.helper";

// Load config eagerly at module initialization
const configData: ConfigObject = await (async () => {
  try {
    const configFileUrl = resolveBase('src/config/repository_api.yaml');
    const configText = await Bun.file(configFileUrl).text();
    const parsedConfig = Bun.YAML.parse(configText) as ConfigObject;

    if (!parsedConfig || typeof parsedConfig !== 'object' || Array.isArray(parsedConfig)) {
      throw new Error('Invalid YAML configuration: root must be an object')
    }

    return parsedConfig;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Failed to load configuration: ${error.message}`);
    }
    throw new Error('Failed to load configuration: Unknown error');
  }
})();

const getNestedValue = (obj: ConfigObject, keys: string[]): ConfigValue => {
  let current: ConfigValue = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }

    // Ensure it's an object (not array, not primitive)
    if (typeof current !== 'object' || Array.isArray(current)) {
      return undefined;
    }

    current = current[key];
  }

  return current;
}

const config = (key: string): ConfigValue => {
  if (!key || typeof key !== 'string') {
    throw new Error('Config key must be a non-empty string');
  }

  const keys = key.split('.').filter(k => k.length > 0);

  if (keys.length === 0) {
    throw new Error('Config key cannot be empty');
  }

  return getNestedValue(configData, keys);
};

export { config };
