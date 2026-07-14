import React from 'react'
import { ImagePlus } from 'lucide-react'

const ImagePlaceholder = ({ label = 'Materi', icon: Icon = ImagePlus }) => {
  return (
    <div className="soft-grid min-h-52 overflow-hidden bg-white/70 p-5 shadow-inner transition-colors duration-300 hover:bg-white dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
      <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-xl bg-white/70 px-5 text-center dark:bg-zinc-950/45">
        <span className="mb-4 grid size-14 place-items-center rounded-xl bg-gradient-to-br from-pink-400 via-lime-300 to-cyan-300 text-zinc-950 shadow-lg shadow-pink-500/20">
          <Icon size={26} />
        </span>
        <p className="text-base font-black text-zinc-900 dark:text-white">Gambar akan disisipkan di sini</p>
        <p className="mt-2 max-w-md text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  )
}

export default ImagePlaceholder
