"use client"

import { Button } from "@/components/ui/button"
import { LabeledInput } from "@/components/ui/labeled-input"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

type ReservationStatus = "pendente" | "confirmada" | "recusada" | "cancelada"

type Reservation = {
	id: string
	teamA: string
	teamB: string
	court: string
	date: string // yyyy-mm-dd
	time: string // HH:MM
	price: number
	status: ReservationStatus
	note?: string
}

const initialData: Reservation[] = [
	{
		id: "1",
		teamA: "Time A",
		teamB: "Time B",
		court: "Quadra 1",
		date: "2025-11-25",
		time: "17:00",
		price: 120,
		status: "pendente",
		note: "Solicitação via app",
	},
	{
		id: "2",
		teamA: "Vikings",
		teamB: "Spartans",
		court: "Quadra 2",
		date: "2025-11-26",
		time: "19:00",
		price: 150,
		status: "confirmada",
	},
	{
		id: "3",
		teamA: "Dragons",
		teamB: "Wolves",
		court: "Quadra 1",
		date: "2025-11-25",
		time: "20:00",
		price: 130,
		status: "recusada",
	},
]

export default function CentralDeReservasPage() {
	const [tab, setTab] = useState<ReservationStatus | "todas">("pendente")
	const [search, setSearch] = useState("")
	const [items, setItems] = useState<Reservation[]>(initialData)

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		return items
			.filter((r) => (tab === "todas" ? true : r.status === tab))
			.filter((r) =>
				!q
					? true
					: [r.teamA, r.teamB, r.court, r.date, r.time]
							.join(" ")
							.toLowerCase()
							.includes(q)
			)
			.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
	}, [items, tab, search])

	const counts = useMemo(() => {
		const base = { pendente: 0, confirmada: 0, recusada: 0, cancelada: 0 }
		for (const r of items) base[r.status]++
		const total = items.length
		return { ...base, total }
	}, [items])

	const setStatus = (id: string, status: ReservationStatus) => {
		setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
	}

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold">Central de Reservas</h2>
				<p className="text-muted-foreground text-sm">
					Aprove, recuse ou gerencie solicitações de reserva da sua quadra.
				</p>
			</header>

			{/* Filtros */}
			<section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-wrap gap-2">
					<TabButton active={tab === "pendente"} onClick={() => setTab("pendente")}>
						Pendentes ({counts.pendente})
					</TabButton>
					<TabButton active={tab === "confirmada"} onClick={() => setTab("confirmada")}>
						Confirmadas ({counts.confirmada})
					</TabButton>
					<TabButton active={tab === "recusada"} onClick={() => setTab("recusada")}>
						Recusadas ({counts.recusada})
					</TabButton>
					<TabButton active={tab === "cancelada"} onClick={() => setTab("cancelada")}>
						Canceladas ({counts.cancelada})
					</TabButton>
					<TabButton active={tab === "todas"} onClick={() => setTab("todas")}>
						Todas ({counts.total})
					</TabButton>
				</div>

				<div className="w-full max-w-xs">
					<LabeledInput
						label="Buscar"
						name="search"
						placeholder="Time, quadra, data..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</section>

			{/* Lista */}
			<section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
				{filtered.length === 0 ? (
					<p className="text-muted-foreground text-sm">Nenhuma reserva encontrada.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="border-b text-xs text-muted-foreground">
								<tr>
									<th className="py-2">Data</th>
									<th className="py-2">Hora</th>
									<th className="py-2">Quadra</th>
									<th className="py-2">Partida</th>
									<th className="py-2">Preço</th>
									<th className="py-2">Status</th>
									<th className="py-2 text-right">Ações</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{filtered.map((r) => (
									<tr key={r.id} className="align-middle">
										<td className="py-2">{formatDate(r.date)}</td>
										<td className="py-2">{r.time}</td>
										<td className="py-2">{r.court}</td>
										<td className="py-2">{r.teamA} vs {r.teamB}</td>
										<td className="py-2">R$ {r.price.toFixed(2)}</td>
										<td className="py-2 capitalize">{r.status}</td>
										<td className="py-2 text-right">
											<RowActions r={r} onStatus={setStatus} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>

			<footer className="text-muted-foreground text-xs">
				Dica: conecte esta página à API (listar/atualizar) e atualize os badges e o header de notificações.
			</footer>
		</div>
	)
}

function TabButton({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
	return (
		<Button
			variant={active ? "default" : "outline"}
			size="sm"
			onClick={onClick}
			className={cn(active && "shadow-xs")}
		>
			{children}
		</Button>
	)
}

function RowActions({ r, onStatus }: { r: Reservation; onStatus: (id: string, s: ReservationStatus) => void }) {
	if (r.status === "pendente") {
		return (
			<div className="flex justify-end gap-2">
				<Button size="sm" onClick={() => onStatus(r.id, "confirmada")}>Aceitar</Button>
				<Button size="sm" variant="outline" onClick={() => onStatus(r.id, "recusada")}>
					Recusar
				</Button>
			</div>
		)
	}
	if (r.status === "confirmada") {
		return (
			<div className="flex justify-end gap-2">
				<Button size="sm" variant="outline" onClick={() => onStatus(r.id, "cancelada")}>
					Cancelar
				</Button>
			</div>
		)
	}
	return <span className="text-muted-foreground text-xs">Sem ações</span>
}

function formatDate(iso: string) {
	try {
		const [y, m, d] = iso.split("-").map(Number)
		return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`
	} catch {
		return iso
	}
}

