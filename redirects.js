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

    // Legacy /scholarcrafted/* URLs → clean URLs
    // This catches anyone who bookmarked or linked to the old paths
    {
      source: '/scholarcrafted/:path*',
      destination: '/:path*',
      permanent: true,
    },

    // Absorbed services → redirect to new Track pages and Express Diagnostic
    {
      source: '/request-review',
      destination: '/order',
      permanent: true,
    },
    {
      source: '/services/editing-proofreading',
      destination: '/services/thesis-to-journal',
      permanent: true,
    },
    {
      source: '/services/publication-support',
      destination: '/services/monograph-architecture',
      permanent: true,
    },
    {
      source: '/services/ai-manuscript-audit',
      destination: '/services/thesis-to-journal',
      permanent: true,
    },
    {
      source: '/services/citation-audits',
      destination: '/services/thesis-to-journal',
      permanent: true,
    },
    {
      source: '/services/indexing-proofs',
      destination: '/services/monograph-architecture',
      permanent: true,
    },
    {
      source: '/services/manuscript-preparation',
      destination: '/services/monograph-architecture',
      permanent: true,
    },
  ]

  return redirects
}

export default redirects
