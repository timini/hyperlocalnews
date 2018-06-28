import fs from 'fs';
import path from 'path';

export const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = relativePath =>
  path.resolve(appDirectory, relativePath);
