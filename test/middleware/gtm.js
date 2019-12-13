export default function({ app }) {
  if (process.server) {
    app.head.script.push({
      hid: 'gtag',
      src: '//www.googletagmanager.com/gtm.js',
      async: true
    })
  }
}
