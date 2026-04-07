'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [equipos, setEquipos] = useState([])
  const [partidos, setPartidos] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: eq } = await supabase.from('equipos').select('*').order('puntos', { ascending: false })
    const { data: pa } = await supabase.from('partidos').select('*, equipo_local:equipo_local_id(nombre), equipo_visitante:equipo_visitante_id(nombre)').order('fecha', { ascending: true })
    setEquipos(eq || [])
    setPartidos(pa || [])
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER */}
      <header className="bg-black py-8 border-b-4 border-[#00FF00] text-center">
        <h1 className="text-[#00FF00] text-3xl font-black uppercase tracking-tighter">
          TORNEO DE FÚTSAL UPARSISTEM
        </h1>
        <p className="text-white text-sm mt-2 opacity-80">EDICIÓN XXXII | 2026</p>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-12">
        
        {/* TABLA DE POSICIONES */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#00FF00] pl-3 italic">POSICIONES</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 uppercase text-xs">
                <tr>
                  <th className="p-3">Equipo</th>
                  <th className="p-3">PJ</th>
                  <th className="p-3">GD</th>
                  <th className="p-3 text-[#00FF00] bg-black">PTS</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-[#00FF00]/5 transition-colors">
                    <td className="p-3 font-bold">{e.nombre} <span className="text-gray-400 font-normal">({e.grupo})</span></td>
                    <td className="p-3">{e.pj}</td>
                    <td className="p-3">{e.gf - e.gc}</td>
                    <td className="p-3 font-black text-lg">{e.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CALENDARIO */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#00FF00] pl-3 italic">CALENDARIO</h2>
          <div className="grid gap-3">
            {partidos.map((p) => (
              <div key={p.id} className="border border-gray-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="text-center flex-1 font-bold uppercase">{p.equipo_local.nombre}</div>
                <div className="mx-4 flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-1">{p.fecha}</span>
                  <div className="bg-black text-[#00FF00] px-4 py-1 rounded-md font-black text-xl">
                    {p.estado === 'jugado' ? `${p.goles_local} - ${p.goles_visitante}` : p.hora.slice(0,5)}
                  </div>
                </div>
                <div className="text-center flex-1 font-bold uppercase">{p.equipo_visitante.nombre}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
