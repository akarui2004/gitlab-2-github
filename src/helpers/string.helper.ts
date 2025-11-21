import type { InterpolateVars, InterpolateOptions } from '@/types';

const interpolate = (
  template: string,
  vars: InterpolateVars,
  options: InterpolateOptions = {}
): string => {
  const { defaultValue = '' } = options;

  return template.replace(/\{([\w.]+)\}/g, (_, key: string): string => {
    const keys = key.split('.');
    let value = vars;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return defaultValue;
    }

    return String(value ?? defaultValue);
  });
};

export { interpolate };
