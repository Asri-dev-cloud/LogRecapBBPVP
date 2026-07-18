import React from 'react'
import { CheckCircle2, ImagePlus } from 'lucide-react'
import CodeBlock from './CodeBlock'
import ImagePlaceholder from './ImagePlaceholder'

const MaterialCard = ({ section, index }) => {
  const colorSchemes = [
    { // Index 0: Pink
      gradient: 'from-pink-500 to-rose-500',
      text: 'text-pink-600 dark:text-pink-400',
      hoverBorder: 'hover:border-pink-450 dark:hover:border-pink-500/40',
      hoverShadow: 'hover:shadow-pink-500/10 dark:hover:shadow-pink-500/15',
      bullet: 'text-pink-500 dark:text-pink-400',
      tableHover: 'hover:bg-pink-50/50 dark:hover:bg-pink-950/20',
      textHover: 'group-hover:text-pink-600 dark:group-hover:text-pink-400'
    },
    { // Index 1: Orange/Yellow
      gradient: 'from-orange-500 to-amber-500',
      text: 'text-orange-600 dark:text-orange-400',
      hoverBorder: 'hover:border-orange-450 dark:hover:border-orange-500/40',
      hoverShadow: 'hover:shadow-orange-500/10 dark:hover:shadow-orange-500/15',
      bullet: 'text-orange-500 dark:text-orange-400',
      tableHover: 'hover:bg-orange-50/50 dark:hover:bg-orange-950/20',
      textHover: 'group-hover:text-orange-600 dark:group-hover:text-orange-450'
    },
    { // Index 2: Blue
      gradient: 'from-blue-500 to-cyan-500',
      text: 'text-blue-600 dark:text-blue-400',
      hoverBorder: 'hover:border-blue-450 dark:hover:border-blue-500/40',
      hoverShadow: 'hover:shadow-blue-500/10 dark:hover:shadow-blue-500/15',
      bullet: 'text-blue-500 dark:text-blue-400',
      tableHover: 'hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
      textHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
    },
    { // Index 3: Green
      gradient: 'from-emerald-500 to-teal-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      hoverBorder: 'hover:border-emerald-450 dark:hover:border-emerald-500/40',
      hoverShadow: 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/15',
      bullet: 'text-emerald-500 dark:text-emerald-400',
      tableHover: 'hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20',
      textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
    },
    { // Index 4: Purple
      gradient: 'from-purple-500 to-violet-500',
      text: 'text-purple-600 dark:text-purple-400',
      hoverBorder: 'hover:border-purple-450 dark:hover:border-purple-500/40',
      hoverShadow: 'hover:shadow-purple-500/10 dark:hover:shadow-purple-500/15',
      bullet: 'text-purple-500 dark:text-purple-400',
      tableHover: 'hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
      textHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
    },
    { // Index 5: Yellow/Lime
      gradient: 'from-yellow-500 to-lime-500',
      text: 'text-yellow-600 dark:text-yellow-400',
      hoverBorder: 'hover:border-yellow-450 dark:hover:border-yellow-500/40',
      hoverShadow: 'hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/15',
      bullet: 'text-yellow-500 dark:text-yellow-400',
      tableHover: 'hover:bg-yellow-50/50 dark:hover:bg-yellow-950/20',
      textHover: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-450'
    }
  ]

  // Penanda materi Pa Septi
  const isPaSepti = section.id === 'materi-pa-septi'
  
  const paSeptiScheme = {
    gradient: 'from-red-500 to-rose-600',
    text: 'text-red-600 dark:text-red-400',
    hoverBorder: 'hover:border-red-450 dark:hover:border-red-500/40',
    hoverShadow: 'hover:shadow-red-500/10 dark:hover:shadow-red-500/15',
    bullet: 'text-red-500 dark:text-red-400',
    tableHover: 'hover:bg-red-50/50 dark:hover:bg-red-950/20',
    textHover: 'group-hover:text-red-600 dark:group-hover:text-red-400'
  }

  const scheme = isPaSepti ? paSeptiScheme : colorSchemes[index === -1 ? 0 : index % colorSchemes.length]

  return (
    <article
      id={section.id}
      className={`scroll-mt-36 group relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/80 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.003] ${scheme.hoverBorder} hover:shadow-2xl ${scheme.hoverShadow} dark:border-white/[0.04] dark:bg-[#090b0f]/75 sm:p-8`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${scheme.gradient}`} />

      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Badge nomor: Hanya muncul jika bukan materi Pa Septi */}
        {!isPaSepti && (
          <div
            className={`grid size-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${scheme.gradient} text-xl font-black text-white shadow-lg shadow-zinc-900/5 transition-transform duration-300 group-hover:scale-105`}
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
          
          <h2 className={`mt-1 text-2xl font-black tracking-tight text-zinc-950 transition-colors duration-300 ${scheme.textHover} dark:text-white sm:text-3xl`}>
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
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-200/70 shadow-sm dark:border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="bg-zinc-950 dark:bg-zinc-900/80">
                  {section.table.columns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white/90 dark:text-zinc-300"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
                {section.table.rows.map((row, rowIdx) => (
                  <tr
                    key={`${section.id}-row-${rowIdx}`}
                    className={`bg-white transition-colors duration-200 odd:bg-zinc-50/60 ${scheme.tableHover} dark:bg-transparent dark:odd:bg-zinc-950/20`}
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={`${section.id}-row-${rowIdx}-cell-${cellIdx}`}
                        className={
                          cellIdx === 0
                            ? `whitespace-nowrap px-4 py-3 align-top font-mono text-xs font-bold ${scheme.text}`
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
          <ul className="mb-6 grid gap-3 rounded-2xl border border-zinc-200/40 bg-zinc-50/50 p-5 dark:border-white/[0.02] dark:bg-zinc-950/30">
            {section.points.map((point, idx) => (
              <li
                key={`${section.id}-point-${idx}`}
                className="flex gap-3 text-sm font-medium leading-7 text-zinc-700 dark:text-zinc-300"
              >
                <CheckCircle2 className={`mt-1 size-4 shrink-0 ${scheme.bullet}`} />
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