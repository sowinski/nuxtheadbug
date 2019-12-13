export default function addheadcode(head, id) {
  const options = {
    id: Date.now(),
    layer: 'dataLayer',
    pageTracking: true,
    pageViewEventName: 'nuxtRoute',
    respectDoNotTrack: false,
    query: {},
    scriptURL: '//www.googletagmanager.com/gtm.js',
    noscriptURL: '//www.googletagmanager.com/ns.html',
    env: {} // env is supported for backward compability and is alias of query
  }

  const queryParams = Object.assign({}, options.env, options.query)

  queryParams.id = options.id

  if (options.layer) {
    queryParams.l = options.layer
  }

  const queryString = Object.keys(queryParams)
    .filter(key => queryParams[key] !== null && queryParams[key] !== undefined)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join('&')

  head = head || {}
  head.noscript = head.noscript || []
  head.script = head.script || []

  head.script.push({
    hid: 'gtag',
    src:
      (options.scriptURL || '//www.googletagmanager.com/gtm.js') +
      '?' +
      queryString,
    async: true
  })

  head.noscript.push({
    hid: 'gtm-noscript',
    innerHTML: `<iframe src="${options.noscriptURL}?${queryString}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    pbody: true
  })

  head.__dangerouslyDisableSanitizersByTagID =
    head.__dangerouslyDisableSanitizersByTagID || {}
  head.__dangerouslyDisableSanitizersByTagID['gtm-noscript'] = ['innerHTML']
}
