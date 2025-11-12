const baseDir = new URL('../../', import.meta.url);

const resolveBase = (relativePath: string): URL => {
  return new URL(relativePath, baseDir);
}

export { baseDir, resolveBase}
