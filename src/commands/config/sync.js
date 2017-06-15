import listr from '../../util/modules/listr'
import getAllFunctionAliases from '../../util/get-all-function-aliases'
import sync from '../../config-sync'

export const command = 'sync'
export const desc = 'Syncs environments across all functions on a shep project'
export function builder (yargs) {
  return yargs
  .pkgConf('shep', process.cwd())
  .describe('env', 'Environment to sync')
  .alias('e', 'env')
  .boolean('quiet')
  .alias('quiet', 'q')
  .describe('quiet', 'Don\'t log anything')
  .example('shep config sync', 'Syncs all environments')
  .example('shep config sync --env beta', 'Syncs `beta` environment')
}

export async function handler (opts) {
  const aliases = new Set()
  if (opts.env === undefined) {
    const allFuncAliases = await getAllFunctionAliases()
    allFuncAliases.reduce((aliaseSet, funcAliases) => {
      funcAliases.forEach(({ Name }) => aliaseSet.add(Name))
      return aliaseSet
    }, aliases)
  } else {
    aliases.add(opts.env)
  }

  const tasks = listr([...aliases].map((alias) => {
    return {
      title: `Syncing ${alias} environment across all functions`,
      task: () => sync({ env: alias })
    }
  }), opts.quiet)

  return tasks.run()
}
