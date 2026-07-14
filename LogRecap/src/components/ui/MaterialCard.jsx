import React from 'react'
import { CheckCircle2, ImagePlus } from 'lucide-react'
import CodeBlock from './CodeBlock'
import ImagePlaceholder from './ImagePlaceholder'

const MaterialCard = ({ section, index }) => {
  const colors = [
    'from-rose-400 to-pink-500',
    'from-orange-400 to-red-500',
    'from-cyan-400 to-blue-500',
    'from-emerald-400 to-teal-500',
    'from-violet-400 to-purple-500',
    'from-yellow-400 to-amber-500',
  ]
  
  // Penanda materi Pa Septi
  const isPaSepti = section.id === 'materi-pa-septi'
  
  // Warna tetap mengikuti index, namun untuk Pa Septi kita gunakan warna khusus 
  // atau fallback ke index agar tetap konsisten dengan array colors
  const color = isPaSepti ? 'from-red-400 to-red-500' : colors[index % colors.length]

  return (
    <article
      id={section.id}
      className="scroll-mt-36 group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/92 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-pink-300/60 hover:shadow-2xl hover:shadow-pink-500/10 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-lime-300/40 dark:hover:shadow-lime-500/10 sm:p-8"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />

      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Badge nomor: Hanya muncul jika bukan materi Pa Septi */}
        {!isPaSepti && (
          <div
            className={`grid size-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${color} text-xl font-black text-white shadow-lg shadow-zinc-900/10 transition-transform duration-300 group-hover:scale-105`}
          >
            {index + 1}
          </div>
        )}
        
        <div className="flex-1">
          {/* Teks Materi X: Hanya muncul jika bukan materi Pa Septi */}
          {!isPaSepti && (
            <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
              Materi {index + 1}
            </p>
          )}
          
          <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950 transition-colors duration-300 group-hover:text-pink-600 dark:text-white dark:group-hover:text-lime-300 sm:text-3xl">
            {section.title}
          </h2>
          
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
            {section.description}
          </p>
        </div>
      </div>

      {/* Render Image, Table, atau Points */}
      {section.image && (
        <div className="mb-6 flex justify-center">
          {section.imageSrc ? (
            <img
              src={section.imageSrc}
              alt={section.imageAlt || section.imageLabel || section.title}
              className="h-auto max-h-72 w-auto max-w-md rounded-lg object-contain sm:max-h-80 sm:max-w-lg"
            />
          ) : (
            <ImagePlaceholder label={section.imageLabel || section.title} icon={ImagePlus} />
          )}
        </div>
      )}

      {section.table ? (
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200/70 shadow-sm dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="bg-zinc-950 dark:bg-white/[0.08]">
                  {section.table.columns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white/90 dark:text-zinc-200"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-white/10">
                {section.table.rows.map((row, rowIdx) => (
                  <tr
                    key={`${section.id}-row-${rowIdx}`}
                    className="bg-white transition-colors duration-200 odd:bg-zinc-50/60 hover:bg-pink-50 dark:bg-transparent dark:odd:bg-white/[0.02] dark:hover:bg-white/[0.06]"
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={`${section.id}-row-${rowIdx}-cell-${cellIdx}`}
                        className={
                          cellIdx === 0
                            ? 'whitespace-nowrap px-4 py-3 align-top font-mono text-xs font-bold text-pink-600 dark:text-lime-300'
                            : 'px-4 py-3 align-top text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        section.points?.length > 0 && (
          <ul className="mb-6 grid gap-3 rounded-xl bg-zinc-50/80 p-4 dark:bg-zinc-950/35">
            {section.points.map((point, idx) => (
              <li
                key={`${section.id}-point-${idx}`}
                className="flex gap-3 text-sm font-medium leading-7 text-zinc-700 dark:text-zinc-300"
              >
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-pink-500 dark:text-lime-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )
      )}

      {section.code && (
        <CodeBlock
          id={section.id}
          code={section.code}
          language={section.language || 'javascript'}
          title={section.codeTitle || 'Contoh kode'}
        />
      )}
    </article>
  )
}

export default MaterialCard