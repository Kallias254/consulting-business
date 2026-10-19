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

    // Absorbed services → redirect to their new parent page
    // citation-audits → now part of Editing & Compliance
    {
      source: '/services/citation-audits',
      destination: '/services/editing-proofreading',
      permanent: true,
    },
    // indexing-proofs → now part of Publication Support
    {
      source: '/services/indexing-proofs',
      destination: '/services/publication-support',
      permanent: true,
    },
    // manuscript-preparation → now part of Publication Support
    {
      source: '/services/manuscript-preparation',
      destination: '/services/publication-support',
      permanent: true,
    },
  ]

  return redirects
}

export default redirects
