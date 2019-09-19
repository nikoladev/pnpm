import readPkg from '@pnpm/read-package-json'
import { PackageJson } from '@pnpm/types'
import path = require('path')

export default async function safeReadPkg (pkgPath: string): Promise<PackageJson | null> {
  try {
    return await readPkg(pkgPath)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
    return null
  }
}

export function fromDir (pkgPath: string): Promise<PackageJson | null> {
  return safeReadPkg(path.join(pkgPath, 'package.json'))
}
