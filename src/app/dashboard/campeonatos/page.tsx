"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LabeledInput } from "@/components/ui/labeled-input"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

type TournamentStyle = "mata-mata" | "pontos-corridos" // nesta versão implementaremos o chaveamento do mata-mata

type Team = {
	id: string
	name: string
	icon?: string // url opcional
}

type Tournament = {
	id: string
	name: string
	style: TournamentStyle
	entryFee: number
	prize: string
	teams: Team[]
}

export default function CampeonatosPage() {
	const [form, setForm] = useState<Partial<Tournament>>({
		name: "Copa FutMatch",
		style: "mata-mata",
		entryFee: 100,
		prize: "R$ 1.000 + Troféu",
		teams: [
			{ id: rid(), name: "Tigers" },
			{ id: rid(), name: "Wolves" },
			{ id: rid(), name: "Dragons" },
			{ id: rid(), name: "Spartans" },
			{ id: rid(), name: "Eagles" },
			{ id: rid(), name: "Pirates" },
			{ id: rid(), name: "Vikings" },
			{ id: rid(), name: "Samurais" },
		],
	})

	const [newTeam, setNewTeam] = useState("")

	const canGenerate = useMemo(() => {
		const n = form.teams?.length ?? 0
		return isPowerOfTwo(n) && n >= 4
	}, [form.teams])

	const bracket = useMemo(() => {
		if (form.style !== "mata-mata" || !canGenerate) return null
		const teams = form.teams ?? []
		return generateKnockoutBracket(teams)
	}, [form.style, canGenerate, form.teams])

	const addTeam = () => {
		if (!newTeam.trim()) return
		setForm((f) => ({ ...f, teams: [...(f.teams ?? []), { id: rid(), name: newTeam.trim() }] }))
		setNewTeam("")
	}

	const removeTeam = (id: string) => {
		setForm((f) => ({ ...f, teams: (f.teams ?? []).filter((t) => t.id !== id) }))
	}

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold">Campeonatos</h2>
				<p className="text-muted-foreground text-sm">
					Crie e gerencie campeonatos. Adicione times, defina o valor de inscrição e veja o chaveamento.
				</p>
			</header>

			{/* Formulário de criação */}
			<section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
				<h3 className="mb-3 text-sm font-medium">Novo campeonato</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<LabeledInput
						label="Nome do campeonato"
						name="name"
						value={form.name ?? ""}
						onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
						required
					/>

					<div className="space-y-1.5">
						<Label>Estilo</Label>
						<div className="flex gap-2">
							{(
								[
									{ id: "mata-mata", label: "Mata-mata" },
									{ id: "pontos-corridos", label: "Pontos corridos" },
								] as const
							).map((opt) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => setForm((f) => ({ ...f, style: opt.id }))}
									className={cn(
										"border-input text-foreground hover:bg-accent hover:text-accent-foreground rounded-md border px-3 py-2 text-sm",
										form.style === opt.id && "bg-primary text-primary-foreground border-primary"
									)}
								>
									{opt.label}
								</button>
							))}
						</div>
					</div>

					<LabeledInput
						label="Valor da inscrição (R$)"
						name="entryFee"
						type="number"
						min={0}
						step={10}
						value={form.entryFee ?? 0}
						onChange={(e) => setForm((f) => ({ ...f, entryFee: Number(e.target.value) }))}
						required
					/>

					<LabeledInput
						label="Premiação"
						name="prize"
						placeholder="Ex.: R$ 1.000 + Troféu"
						value={form.prize ?? ""}
						onChange={(e) => setForm((f) => ({ ...f, prize: e.target.value }))}
						required
					/>
				</div>
			</section>

			{/* Gerenciar times */}
			<section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
				<h3 className="mb-3 text-sm font-medium">Times participantes</h3>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end">
						<div className="w-full max-w-sm">
							<LabeledInput
								label="Nome do time"
								name="team"
								placeholder="Ex.: Thunder FC"
								value={newTeam}
								onChange={(e) => setNewTeam(e.target.value)}
							/>
						</div>
						<Button onClick={addTeam}>Adicionar</Button>
					</div>

					<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{(form.teams ?? []).map((t) => (
							<li key={t.id} className="border-muted bg-muted/30 flex items-center justify-between gap-3 rounded-md border p-2">
								<div className="flex items-center gap-2">
									<TeamIcon name={t.name} icon={t.icon} />
									<span className="text-sm font-medium">{t.name}</span>
								</div>
								<Button size="sm" variant="outline" onClick={() => removeTeam(t.id)}>
									Remover
								</Button>
							</li>
						))}
					</ul>
					<p className="text-muted-foreground text-xs">
						Dica: para gerar o chaveamento do mata-mata, use 4, 8 ou 16 times (potências de 2).
					</p>
				</div>
			</section>

			{/* Chaveamento */}
			<section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
				<div className="mb-3 flex items-center justify-between">
					<div>
						<h3 className="text-sm font-medium">Chaveamento</h3>
						<p className="text-muted-foreground text-xs">Visualização do mata-mata a partir dos times participantes.</p>
					</div>
					<div className="text-xs text-muted-foreground">
						{canGenerate ? (form.teams?.length ?? 0) : 0} times
					</div>
				</div>

				{!canGenerate || !bracket ? (
					<p className="text-muted-foreground text-sm">Adicione 4, 8 ou 16 times para gerar o chaveamento (mata-mata).</p>
				) : (
					<BracketView rounds={bracket} />
				)}
			</section>
		</div>
	)
}

// Components
function TeamIcon({ name, icon }: { name: string; icon?: string }) {
	if (icon) {
		return <img src={icon} alt={name} className="size-6 rounded-full object-cover" />
	}
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase()
	return (
		<div className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full text-[10px] font-semibold">
			{initials}
		</div>
	)
}

// Bracket types and generator
type Match = {
	id: string
	teamA?: Team
	teamB?: Team
	winner?: Team
}

type Round = {
	id: string
	name: string // Oitavas, Quartas, Semis, Final
	matches: Match[]
}

function generateKnockoutBracket(teams: Team[]): Round[] {
	const n = teams.length
	const rounds: Round[] = []

	const roundNames: Record<number, string> = {
		16: "Oitavas",
		8: "Quartas",
		4: "Semifinais",
		2: "Final",
	}

	let currentTeams = shuffle([...teams])
	let size = n
	while (size >= 2) {
		const name = roundNames[size] ?? `R${Math.log2(size)}`
		const matches: Match[] = []
		for (let i = 0; i < size; i += 2) {
			matches.push({ id: rid(), teamA: currentTeams[i], teamB: currentTeams[i + 1] })
		}
		rounds.push({ id: rid(), name, matches })
		// Avança com placeholders (sem simulação de vencedores de fato)
		currentTeams = new Array(size / 2).fill(null).map((_, i) => ({ id: rid(), name: `Vencedor ${i + 1}` }))
		size = size / 2
	}

	return rounds
}

function BracketView({ rounds }: { rounds: Round[] }) {
	return (
		<div className="overflow-x-auto">
			<div className="grid auto-cols-max grid-flow-col gap-6">
				{rounds.map((round, rIdx) => (
					<div key={round.id} className="min-w-56">
						<h4 className="mb-2 text-center text-xs font-medium uppercase text-muted-foreground">
							{round.name}
						</h4>
						<div className="flex flex-col gap-4">
							{round.matches.map((m, idx) => (
								<div key={m.id} className="flex flex-col gap-1">
									<MatchCard team={m.teamA} side="A" isNextSpacer={idx % 2 === 0} />
									<MatchCard team={m.teamB} side="B" />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function MatchCard({ team, side }: { team?: Team; side: "A" | "B"; isNextSpacer?: boolean }) {
	return (
		<div className="bg-muted/40 border-muted flex items-center justify-between gap-2 rounded-md border px-2 py-2">
			<div className="flex items-center gap-2">
				<TeamIcon name={team?.name ?? "A definir"} icon={team?.icon} />
				<span className="text-sm">{team?.name ?? "A definir"}</span>
			</div>
			<span className="text-muted-foreground text-xs">{side}</span>
		</div>
	)
}

// utils
function isPowerOfTwo(n: number) {
	return (n & (n - 1)) === 0
}

function rid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		// @ts-ignore
		return crypto.randomUUID() as string
	}
	return Math.random().toString(36).slice(2)
}

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr]
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

