const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirects = [
    internetExplorerRedirect,

    // Absorbed services → redirect to their new parent page
    // citation-audits → now part of Editing & Compliance
    {
      source: '/scholarcrafted/services/citation-audits',
      destination: '/scholarcrafted/services/editing-proofreading',
      permanent: true,
    },
    // indexing-proofs → now part of Publication Support
    {
      source: '/scholarcrafted/services/indexing-proofs',
      destination: '/scholarcrafted/services/publication-support',
      permanent: true,
    },
    // manuscript-preparation → now part of Publication Support
    {
      source: '/scholarcrafted/services/manuscript-preparation',
      destination: '/scholarcrafted/services/publication-support',
      permanent: true,
    },
  ]

  return redirects
}

export default redirects
