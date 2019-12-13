import gtmAddheadcode from '~/src/googletagmanager.js'

export default function({ app }) {
  if (process.server) {
    gtmAddheadcode(app.head, 'test')
  }
}
