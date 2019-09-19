import prepare from '@pnpm/prepare'
import { PackageJson } from '@pnpm/types'
import loadJsonFile = require('load-json-file')
import path = require('path')
import tape = require('tape')
import promisifyTape from 'tape-promise'
import { execPnpm } from '../utils'

const basicPackageJson = loadJsonFile.sync<PackageJson>(path.join(__dirname, '../utils/simple-package.json'))
const test = promisifyTape(tape)
test['only'] = promisifyTape(tape.only)

test('production install (with --production flag)', async (t: tape.Test) => {
  const project = prepare(t, basicPackageJson)

  await execPnpm('install', '--production')

  await project.hasNot(Object.keys(basicPackageJson.devDependencies!)[0])
  await project.has('rimraf')
  await project.has('is-positive')
})

test('production install (with production NODE_ENV)', async (t: tape.Test) => {
  const originalNodeEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  const project = prepare(t, basicPackageJson)

  await execPnpm('install')

  // reset NODE_ENV
  process.env.NODE_ENV = originalNodeEnv

  await project.hasNot(Object.keys(basicPackageJson.devDependencies!)[0])
  await project.has('rimraf')
  await project.has('is-positive')
})

test('install dev dependencies only', async (t: tape.Test) => {
  const project = prepare(t, {
    dependencies: {
      'is-positive': '^1.0.0',
    },
    devDependencies: {
      'is-negative': '^1.0.0',
    },
  })

  // NODE_ENV should be ignored if --only is used
  const originalNodeEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  await execPnpm('install', '--only', 'dev')

  // reset NODE_ENV
  process.env.NODE_ENV = originalNodeEnv

  const isNegative = project.requireModule('is-negative')
  t.equal(typeof isNegative, 'function', 'dev dependency is available')

  await project.hasNot('is-positive')
})
