'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import type { Footer as FooterType } from '@/payload-types'

export const FooterClient: React.FC<{ data: FooterType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  // Determine variant based on path
  const isResearcher = pathname.startsWith('/researcher')
  const isAdmin = pathname.startsWith('/admin/command')
  const isDashboard = pathname.startsWith('/dashboard')

  if (isResearcher) {
    return (
      <footer 
        className="mt-auto border-t border-parchment bg-parchment text-deep-green py-12"
        data-mantine-color-scheme="light"
        data-theme="light"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link className="flex items-center gap-2 mb-6" href="/">
                <span className="text-deep-green text-2xl">◈</span>
                <span className="font-display text-xl tracking-tighter uppercase text-deep-green">Faculty of Research</span>
              </Link>
              <p className="font-sans text-[10px] text-deep-green/60 leading-relaxed max-w-sm uppercase tracking-wider">
                This environment is optimized for technical drafting and manuscript preparation. 
                All commits are logged and versioned within the sovereign manuscript lab.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-[10px] text-burnished-gold uppercase tracking-[0.2em] mb-6">Lab_Resources</h4>
              <nav className="flex flex-col gap-3">
                <Link href="/methodology" className="font-sans text-[10px] text-deep-green/40 hover:text-burnished-gold uppercase transition-colors">Methodology_Docs</Link>
                <Link href="/researcher/drafts" className="font-sans text-[10px] text-deep-green/40 hover:text-burnished-gold uppercase transition-colors">Active_Drafts</Link>
                <Link href="/dashboard/vault" className="font-sans text-[10px] text-deep-green/40 hover:text-burnished-gold uppercase transition-colors">The_Vault</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-sans text-[10px] text-burnished-gold uppercase tracking-[0.2em] mb-6">Unit_Status</h4>
              <div className="flex flex-col gap-3 font-sans text-[10px] text-deep-green/60 uppercase">
                <span>Sync: Optimal</span>
                <span>Uptime: 99.99%</span>
                <span>Node: US-EAST-1</span>
              </div>
            </div>
          </div>
          <div className="border-t border-deep-green/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-sans text-[10px] text-deep-green/40 uppercase tracking-[0.2em]">
              © 2026 FACULTY OF RESEARCH // MS-LAB-7 // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex gap-8 items-center">
              <ThemeSelector />
              <div className="font-sans text-[9px] text-burnished-gold/30 uppercase">v2.4.0_STABLE</div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (isAdmin) {
    return (
      <footer className="mt-auto border-t border-burnished-gold/20 bg-black text-parchment py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <Link className="flex items-center gap-2 mb-4" href="/">
                <span className="text-burnished-gold text-2xl">◈</span>
                <span className="font-display text-xl tracking-tighter uppercase">Command Center</span>
              </Link>
              <div className="font-sans text-[9px] text-deep-green/60 uppercase tracking-[0.3em]">
                Principal Oversight & Global Operations
              </div>
            </div>
            <div className="flex flex-wrap gap-12">
              <div>
                <h4 className="font-sans text-[10px] text-burnished-gold/60 uppercase mb-4">Pulse_Monitor</h4>
                <div className="font-sans text-[9px] text-deep-green/60 uppercase space-y-2">
                  <div className="flex justify-between gap-4"><span>Sys_Load:</span> <span className="text-sage">2.4%</span></div>
                  <div className="flex justify-between gap-4"><span>Sentiment:</span> <span className="text-sage">Stable</span></div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <ThemeSelector />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
            <div className="font-sans text-[8px] text-deep-green/40 uppercase tracking-widest">
              ROOT_ACCESS_LOGGED // IP_OVERSIGHT_ENABLED
            </div>
            <div className="font-sans text-[8px] text-burnished-gold/40 uppercase tracking-widest">
              SECURE_COMMAND_v4.2.1
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (isDashboard) {
    return (
      <footer className="mt-auto border-t border-parchment-2 bg-white text-dark-forest py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <Link className="flex items-center gap-2 mb-6" href="/">
                <span className="text-deep-green text-2xl">◈</span>
                <span className="font-display text-xl tracking-tighter uppercase text-deep-green">Scientist Portal</span>
              </Link>
              <p className="font-serif text-sm text-deep-green/70 leading-relaxed italic">
                &quot;Excellence in academic intelligence through sovereign infrastructure and faculty-led oversight.&quot;
              </p>
            </div>
            <div>
              <h4 className="font-display text-xs uppercase tracking-widest text-burnished-gold mb-6">Institutional Links</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/dashboard/history" className="text-xs text-deep-green/60 hover:text-deep-green transition-colors font-medium">Manuscript History</Link>
                <Link href="/dashboard/portfolio" className="text-xs text-deep-green/60 hover:text-deep-green transition-colors font-medium">Living Portfolio</Link>
                <Link href="/dashboard/validation" className="text-xs text-deep-green/60 hover:text-deep-green transition-colors font-medium">Validation Reports</Link>
              </nav>
            </div>
            <div className="bg-parchment-0 p-8 border border-parchment-2">
              <h4 className="font-display text-xs uppercase tracking-widest text-deep-green mb-4">Portal Support</h4>
              <p className="text-[10px] text-deep-green/50 uppercase tracking-wider mb-6">Direct Faculty Correspondence Active</p>
              <Link href="/dashboard/correspondence" className="inline-block px-6 py-2 border border-deep-green text-deep-green font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-deep-green hover:text-white transition-all">
                Send_Message_
              </Link>
            </div>
          </div>
          <div className="border-t border-parchment-2 pt-8 flex justify-between items-center">
            <div className="font-sans text-[9px] text-deep-green/40 uppercase tracking-widest">
              © 2026 THE SCIENTIST PORTAL // FACULTY-LED OVERSIGHT
            </div>
            <div className="flex gap-6 items-center">
              <ThemeSelector />
              <div className="font-sans text-[9px] text-deep-green/20 uppercase">Encrypted_Session</div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Default Home/Public Footer
  return (
    <footer className="mt-auto border-t border-deep-green/20 bg-dark-forest text-parchment py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <Link className="flex items-center gap-2 mb-8" href="/">
              <span className="text-burnished-gold text-3xl">◈</span>
              <span className="font-display text-2xl tracking-tighter uppercase">Scientist / aaS</span>
            </Link>
            <p className="text-parchment/50 leading-relaxed mb-8">
              Bespoke academic intelligence and sovereign publication infrastructure for world-class researchers.
            </p>
            <div className="flex gap-6">
              {navItems.map(({ link }, i) => (
                <CMSLink 
                  key={i} 
                  {...link} 
                  className="font-sans text-[10px] text-parchment/40 hover:text-burnished-gold uppercase tracking-widest transition-colors" 
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="bg-black/40 border border-deep-green/30 p-8 backdrop-blur-sm">
              <div className="font-sans text-[10px] text-burnished-gold uppercase tracking-[0.3em] mb-4">Institutional_Access</div>
              <Link href="/login" className="flex items-center justify-between group">
                <span className="font-display text-xl uppercase tracking-tighter group-hover:text-burnished-gold transition-colors">Portal Login</span>
                <span className="text-burnished-gold group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-deep-green/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
            <div className="font-sans text-[10px] text-deep-green/60 uppercase tracking-[0.2em]">
              IP: 192.168.1.XXX | LATENCY: 24MS | SESSION: ACTIVE
            </div>
            <div className="font-sans text-[8px] text-deep-green/40 uppercase tracking-[0.1em]">
              Sovereign infrastructure // AES-256 BIT ENCRYPTION
            </div>
          </div>
          <div className="flex items-center gap-8">
            <ThemeSelector />
            <div className="font-sans text-[10px] text-burnished-gold/40 uppercase tracking-widest">v2.0.4</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
