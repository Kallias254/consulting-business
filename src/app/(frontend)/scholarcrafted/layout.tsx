import React from 'react'

export default function ScholarCraftedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scholarcrafted-root">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Hide default header and footer on this route */
        header, footer:not(.scholarcrafted-footer) {
          display: none !important;
        }

        /* Ensure the body background matches our design */
        body {
          background-color: white !important;
        }

        .scholarcrafted-root {
           font-feature-settings: "ss01", "ss02", "cv01", "cv02";
           -webkit-font-smoothing: antialiased;
           -moz-osx-font-smoothing: grayscale;
        }
      `,
        }}
      />
      {children}
    </div>
  )
}
