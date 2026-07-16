import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Compass, Layers, Lightbulb, Sparkles, Target } from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import SectionHeading from '../components/ui/SectionHeading'
import MaterialCard from '../components/ui/MaterialCard'
import Sidebar from '../components/layout/Sidebar'
import { readCustomMaterial } from '../utils/customMaterialStorage'

const overviewIcons = [Lightbulb, Compass, Layers, Target, Sparkles]
const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname.includes('localhost') ? 'http://localhost:5000/api' : '/api');

const MaterialPage = ({ material, topic }) => {
  const [customSections, setCustomSections] = useState(() => readCustomMaterial(topic?.slug) || [])

  useEffect(() => {
    if (!topic?.slug) return
    let active = true
    const fetchCustomSections = async () => {
      try {
        const res = await fetch(`${API_BASE}/materials/${topic.slug}`)
        if (res.ok) {
          const data = await res.json()
          if (active && data.sections) {
            setCustomSections(data.sections)
          }
        }
      } catch (err) {
        console.error('Failed to load database material sections:', err)
      }
    }
    fetchCustomSections()
    return () => {
      active = false
    }
  }, [topic?.slug])

  if (!material || !topic) {
    return <Navigate to="/" replace />
  }

  const sections = [...material.sections, ...customSections]

  return (
    <PageTransition className="pb-16">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 px-5 py-12 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/25 sm:px-8 lg:px-12">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${topic.accent}`} />
          <SectionHeading eyebrow={`Materi ${topic.code}`} title={material.title} description={material.subtitle} />
          
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-4">
            {material.overview.map((item, idx) => {
              const Icon = overviewIcons[idx % overviewIcons.length]
              return (
                <div key={item} className="group relative w-full max-w-[15rem] flex-1 basis-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:border-zinc-700">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-5 select-none text-7xl font-black text-zinc-100 transition-colors duration-300 group-hover:text-zinc-200 dark:text-white/[0.02] dark:group-hover:text-white/[0.05]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`relative mb-4 grid size-10 place-items-center rounded-xl bg-gradient-to-br ${topic.accent} text-zinc-950 shadow-md`}>
                    <Icon size={18} />
                  </span>
                  <p className="relative text-sm font-medium leading-7 text-zinc-600 dark:text-zinc-300">{item}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-7xl gap-6 px-4 sm:px-6">
        <Sidebar sections={sections} topicSlug={topic.slug} />

        <div className="grid gap-6">
          {sections.map((section, index) => {
            const regularIndex = sections
              .slice(0, index)
              .filter((s) => s.id !== 'materi-pa-septi').length;

            return (
              <MaterialCard 
                key={section.id || index}
                section={section} 
                index={section.id === 'materi-pa-septi' ? -1 : regularIndex} 
                isUserPage={true} // helper prop to signal student view
              />
            );
          })}
        </div>
      </section>
    </PageTransition>
  )
}

export default MaterialPage