import React from 'react'
import { ExitIntentModal } from './_components/ExitIntentModal'

export default function ScholarCraftedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scholarcrafted-root" data-mantine-color-scheme="light">
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
           color: #1a1a1a;
        }
        .scholarcrafted-root input,
        .scholarcrafted-root textarea,
        .scholarcrafted-root select {
           color: #1a1a1a !important;
           background-color: #ffffff !important;
        }

        /* Ensure all dark containers, footers, and banners have crisp legible white text */
        .scholarcrafted-root .dark-scholar-section,
        .scholarcrafted-root .dark-scholar-section h1,
        .scholarcrafted-root .dark-scholar-section h2,
        .scholarcrafted-root .dark-scholar-section h3,
        .scholarcrafted-root .dark-scholar-section h4,
        .scholarcrafted-root .dark-scholar-section p,
        .scholarcrafted-root .dark-scholar-section span,
        .scholarcrafted-root .dark-scholar-section div,
        .scholarcrafted-root .scholarcrafted-footer,
        .scholarcrafted-root .scholarcrafted-footer h1,
        .scholarcrafted-root .scholarcrafted-footer h2,
        .scholarcrafted-root .scholarcrafted-footer h3,
        .scholarcrafted-root .scholarcrafted-footer h4,
        .scholarcrafted-root .scholarcrafted-footer p,
        .scholarcrafted-root .scholarcrafted-footer span,
        .scholarcrafted-root .scholarcrafted-footer a,
        .scholarcrafted-root [data-dark-bg="true"],
        .scholarcrafted-root [data-dark-bg="true"] h1,
        .scholarcrafted-root [data-dark-bg="true"] h2,
        .scholarcrafted-root [data-dark-bg="true"] h3,
        .scholarcrafted-root [data-dark-bg="true"] p,
        .scholarcrafted-root [data-dark-bg="true"] span,
        .scholarcrafted-root [data-dark-bg="true"] div {
           color: #ffffff !important;
        }

        .scholarcrafted-root [data-accent="true"] {
           color: #E65C38 !important;
        }
        .scholarcrafted-root [data-dimmed-light="true"] {
           color: rgba(255, 255, 255, 0.75) !important;
        }

        /* Quiet Editorial Card & Micro-Interaction System */
        .scholarcrafted-root .editorial-card {
           transition: border-color 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                       transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                       box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scholarcrafted-root .editorial-card-interactive:hover {
           border-color: rgba(230, 92, 56, 0.42) !important;
           transform: translateY(-2px);
           box-shadow: 0 14px 34px -16px rgba(26, 26, 26, 0.12);
        }
        .scholarcrafted-root .editorial-card-spotlight {
           position: absolute;
           inset: 0;
           pointer-events: none;
           opacity: 0;
           transition: opacity 0.3s ease;
           background: radial-gradient(
             420px circle at var(--mx, 50%) var(--my, 50%),
             rgba(230, 92, 56, 0.055),
             transparent 65%
           );
           z-index: 0;
        }
        .scholarcrafted-root .editorial-card-interactive:hover .editorial-card-spotlight {
           opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
           .scholarcrafted-root .editorial-card,
           .scholarcrafted-root .editorial-card-spotlight {
              transition: none !important;
              transform: none !important;
           }
        }
      ` }}
      />
      <ExitIntentModal />
      {children}
    </div>
  )
}
