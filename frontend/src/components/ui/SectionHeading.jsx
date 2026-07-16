import React from 'react'
import { Sparkles } from 'lucide-react'

const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200/50 bg-white/70 px-4 py-2 shadow-sm dark:border-lime-300/20 dark:bg-white/[0.06]">
          <Sparkles className="size-4 text-pink-500 dark:text-lime-300" />
          <p className="bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-xs font-black uppercase tracking-[0.22em] text-transparent dark:from-pink-300 dark:to-cyan-300">
            {eyebrow}
          </p>
        </div>
      )}

      <h1 className="text-4xl font-black leading-tight tracking-normal text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-r from-pink-600 via-cyan-600 to-lime-500 bg-clip-text text-transparent dark:from-pink-300 dark:via-cyan-300 dark:to-lime-300">
          {title}
        </span>
      </h1>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
