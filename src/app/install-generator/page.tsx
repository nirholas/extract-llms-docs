'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Terminal, Sparkles, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InstallMdWizard } from '@/components/install-generator'

export default function InstallGeneratorPage() {
  const handleComplete = useCallback((content: string) => {
    // Download the file
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'install.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
              <Terminal className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">install.md Generator</h1>
              <p className="text-neutral-400">
                Create LLM-executable installation instructions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-4 bg-white/5 border border-neutral-700 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-medium text-white mb-1">What is install.md?</h2>
              <p className="text-sm text-neutral-400 mb-3">
                The <code className="px-1.5 py-0.5 bg-white/10 rounded text-white">install.md</code> standard 
                provides LLM-executable installation instructions. Unlike traditional docs written for humans, 
                install.md is designed for AI agents to autonomously install your software.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://installmd.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  installmd.org
                </a>
                <a
                  href="https://github.com/mintlify/install-md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Usage Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 p-4 bg-neutral-900 border border-neutral-700 rounded-xl"
        >
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Usage</h3>
          <p className="text-sm text-neutral-400 mb-3">
            Users can pipe your install.md directly to an AI agent:
          </p>
          <div className="bg-black rounded-lg p-3 font-mono text-sm text-green-400">
            curl -fsSL https://yourdocs.com/install.md | claude
          </div>
        </motion.div>

        {/* Generator Wizard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <InstallMdWizard onComplete={handleComplete} />
        </motion.div>

        {/* Format Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Format Reference</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white/5 border border-neutral-700 rounded-xl">
              <h3 className="font-medium text-white mb-2">Required Elements</h3>
              <ul className="text-sm text-neutral-400 space-y-1.5">
                <li>• <code className="text-white">H1</code> - Product name (lowercase-hyphenated)</li>
                <li>• <code className="text-white">OBJECTIVE:</code> - Installation goal</li>
                <li>• <code className="text-white">DONE WHEN:</code> - Success criteria</li>
                <li>• <code className="text-white">## TODO</code> - Checkbox list</li>
                <li>• <code className="text-white">EXECUTE NOW:</code> - Final call-to-action</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 border border-neutral-700 rounded-xl">
              <h3 className="font-medium text-white mb-2">Optional Elements</h3>
              <ul className="text-sm text-neutral-400 space-y-1.5">
                <li>• <code className="text-white">&gt;</code> - Blockquote description</li>
                <li>• Step sections with code blocks</li>
                <li>• Multiple package manager options</li>
                <li>• Platform-specific instructions</li>
                <li>• Link to llms.txt for troubleshooting</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
