'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Text } from '@mantine/core'
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
      <footer className="mt-auto border-t border-deep-green/30 bg-dark-forest text-parchment py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            {/* Division 1: The Crest & Motto */}
            <div className="col-span-1 md:col-span-1">
              <Link className="flex flex-col gap-4 mb-8" href="/">
                <span className="text-burnished-gold text-4xl leading-none">◈</span>
                <div>
                  <span className="font-display text-2xl tracking-tighter uppercase text-white block leading-tight">Vance / Lab</span>
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-burnished-gold/60 block mt-1">Sovereign_Infrastructure</span>
                </div>
              </Link>
              <p className="font-serif text-xs text-parchment/50 leading-relaxed italic border-l-2 border-burnished-gold/20 pl-4 py-1">
                &quot;Excellence in academic intelligence through <br />
                rigorous methodological oversight and <br />
                faculty-led sovereign architecture.&quot;
              </p>
            </div>

            {/* Division 2: Institutional Access */}
            <div>
              <h4 className="font-display text-[10px] uppercase tracking-[0.25em] text-burnished-gold mb-8 pb-2 border-b border-white/5">Institutional_Navigation</h4>
              <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="text-[11px] text-parchment/60 hover:text-white uppercase tracking-wider transition-colors font-medium flex items-center gap-2">
                  <span className="text-[8px] text-burnished-gold/40">01</span> Project_Hub
                </Link>
                <Link href="/dashboard/portfolio" className="text-[11px] text-parchment/60 hover:text-white uppercase tracking-wider transition-colors font-medium flex items-center gap-2">
                  <span className="text-[8px] text-burnished-gold/40">02</span> Impact_Portfolio
                </Link>
                <Link href="/dashboard/cv" className="text-[11px] text-parchment/60 hover:text-white uppercase tracking-wider transition-colors font-medium flex items-center gap-2">
                  <span className="text-[8px] text-burnished-gold/40">03</span> Academic_Dossier
                </Link>
                <Link href="/dashboard/vault" className="text-[11px] text-parchment/60 hover:text-white uppercase tracking-wider transition-colors font-medium flex items-center gap-2">
                  <span className="text-[8px] text-burnished-gold/40">04</span> Artifact_Vault
                </Link>
              </nav>
            </div>

            {/* Division 3: Compliance & Integrity */}
            <div>
              <h4 className="font-display text-[10px] uppercase tracking-[0.25em] text-burnished-gold mb-8 pb-2 border-b border-white/5">Compliance_&_Integrity</h4>
              <div className="flex flex-col gap-5">
                <div className="group">
                  <Text className="text-[9px] text-burnished-gold/40 uppercase tracking-widest mb-1">Oversight_Protocol</Text>
                  <Text className="text-[11px] text-parchment/70 leading-snug">All manuscript outputs undergo statistical validation and manual faculty clearance.</Text>
                </div>
                <div className="group">
                  <Text className="text-[9px] text-burnished-gold/40 uppercase tracking-widest mb-1">Encryption_Standard</Text>
                  <Text className="text-[11px] text-parchment/70 leading-snug">AES-256 Bit Sovereign Encryption Active // IP_Tracking Enabled</Text>
                </div>
              </div>
            </div>

            {/* Division 4: Faculty Liaison */}
            <div className="bg-white/5 p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <span className="text-6xl text-white">◈</span>
              </div>
              <h4 className="font-display text-[10px] uppercase tracking-[0.2em] text-white mb-4">Faculty_Liaison</h4>
              <p className="text-[10px] text-parchment/40 uppercase tracking-wider mb-8 leading-relaxed">
                Direct encrypted line to Principal Investigator Micah S. available for priority matters.
              </p>
              <Link href="/dashboard" className="flex items-center justify-center w-full py-3 bg-burnished-gold text-dark-forest font-sans text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-all">
                Dispatch_Memo
              </Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-12">
              <div className="font-sans text-[9px] text-parchment/30 uppercase tracking-[0.3em]">
                © 2026 THE VANCE LABORATORY // INSTITUTIONAL_OVERSIGHT
              </div>
              <div className="hidden md:block h-3 w-[1px] bg-white/10"></div>
              <div className="font-sans text-[8px] text-burnished-gold/30 uppercase tracking-widest">
                System_Node: PHX-US-01 // v4.8.2_Stable
              </div>
            </div>
            
            <div className="flex gap-8 items-center">
              <ThemeSelector />
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage shadow-[0_0_8px_rgba(183,206,188,0.5)]"></div>
                <div className="font-sans text-[9px] text-parchment/40 uppercase tracking-widest">Connection: Secure</div>
              </div>
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
