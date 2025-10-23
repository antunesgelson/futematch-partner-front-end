"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LabeledInput } from "@/components/ui/labeled-input"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

type ScheduleRule = {
    id: string
    court: string
    daysOfWeek: number[] // 0=Dom, 1=Seg, ..., 6=Sáb (padrão JS)
    startTime: string // HH:MM
    endTime: string // HH:MM
    durationMin: number
    price: number
}

type Slot = {
    id: string
    date: string // yyyy-mm-dd
    time: string // HH:MM
    court: string
    price: number
    available: boolean
}

export default function GerenciarHorarios() {
    const [rules, setRules] = useState<ScheduleRule[]>([])
    const [form, setForm] = useState<Partial<ScheduleRule>>({
        court: "Quadra 1",
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:00",
        endTime: "18:00",
        durationMin: 60,
        price: 100,
    })

    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    )

    // Overrides de disponibilidade por slot (date+time+court)
    const [overrides, setOverrides] = useState<Record<string, boolean>>({})

    const weekdayIndex = (dateISO: string) => new Date(dateISO + "T00:00:00").getDay()

    const addRule = () => {
        if (!form.court || !form.startTime || !form.endTime || !form.durationMin || !form.price) return
        const start = toMinutes(form.startTime)
        const end = toMinutes(form.endTime)
        if (end <= start) return
        if ((form.durationMin ?? 0) <= 0) return

        const newRule: ScheduleRule = {
            id: cryptoRandomId(),
            court: form.court!,
            daysOfWeek: form.daysOfWeek?.length ? form.daysOfWeek : [weekdayIndex(selectedDate)],
            startTime: form.startTime!,
            endTime: form.endTime!,
            durationMin: Number(form.durationMin),
            price: Number(form.price),
        }
        setRules((prev) => [...prev, newRule])
    }

    const generatedSlots: Slot[] = useMemo(() => {
        const weekday = weekdayIndex(selectedDate)
        const slots: Slot[] = []
        for (const r of rules) {
            if (!r.daysOfWeek.includes(weekday)) continue
            const start = toMinutes(r.startTime)
            const end = toMinutes(r.endTime)
            for (let t = start; t + r.durationMin <= end; t += r.durationMin) {
                const time = fromMinutes(t)
                const id = `${selectedDate}|${time}|${r.court}`
                const available = overrides[id] ?? true
                slots.push({ id, date: selectedDate, time, court: r.court, price: r.price, available })
            }
        }
        // Ordena por horário e quadra
        return slots.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : a.court.localeCompare(b.court)))
    }, [rules, selectedDate, overrides])

    const toggleSlot = (slot: Slot) => {
        setOverrides((prev) => ({ ...prev, [slot.id]: !(prev[slot.id] ?? slot.available) }))
    }

    const removeRule = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id))

    const setDays = (day: number) => {
        const current = new Set(form.daysOfWeek ?? [])
        if (current.has(day)) current.delete(day)
        else current.add(day)
        setForm((f) => ({ ...f, daysOfWeek: Array.from(current).sort() }))
    }

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <header className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Gerenciar horários</h2>
                <p className="text-muted-foreground text-sm">
                    Crie regras semanais de horários e visualize os slots disponíveis por dia.
                </p>
            </header>

            {/* Formulário de regras */}
            <section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-medium">Nova regra</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <LabeledInput
                        label="Quadra"
                        name="court"
                        value={form.court ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, court: e.target.value }))}
                        required
                    />

                    <div className="space-y-1.5">
                        <Label>Dias da semana</Label>
                        <div className="grid grid-cols-7 gap-1">
                            {WEEK_DAYS.map((d) => (
                                <button
                                    key={d.value}
                                    type="button"
                                    onClick={() => setDays(d.value)}
                                    className={cn(
                                        "border-input text-foreground hover:bg-accent hover:text-accent-foreground rounded-md border px-2 py-2 text-xs md:text-sm",
                                        (form.daysOfWeek ?? []).includes(d.value) && "bg-primary text-primary-foreground border-primary"
                                    )}
                                >
                                    {d.short}
                                </button>
                            ))}
                        </div>
                    </div>

                    <LabeledInput
                        label="Início"
                        name="startTime"
                        type="time"
                        value={form.startTime ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                        required
                    />

                    <LabeledInput
                        label="Fim"
                        name="endTime"
                        type="time"
                        value={form.endTime ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                        required
                    />

                    <LabeledInput
                        label="Duração (min)"
                        name="durationMin"
                        type="number"
                        min={15}
                        step={15}
                        value={form.durationMin ?? 60}
                        onChange={(e) => setForm((f) => ({ ...f, durationMin: Number(e.target.value) }))}
                        required
                    />

                    <LabeledInput
                        label="Preço (R$)"
                        name="price"
                        type="number"
                        min={0}
                        step={5}
                        value={form.price ?? 0}
                        onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                        required
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    <Button onClick={addRule}>Salvar regra</Button>
                </div>
            </section>

            {/* Lista de regras */}
            <section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-medium">Regras ativas</h3>
                {rules.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhuma regra criada.</p>
                ) : (
                    <ul className="divide-border divide-y">
                        {rules.map((r) => (
                            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                                <div className="text-sm">
                                    <p className="font-medium">{r.court}</p>
                                    <p className="text-muted-foreground">
                                        {formatDays(r.daysOfWeek)} • {r.startTime} - {r.endTime} • {r.durationMin} min • R$ {r.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => removeRule(r.id)}>
                                        Remover
                                    </Button>
                                </div>
                            </li>) )}
                    </ul>
                )}
            </section>

            {/* Visualização por dia */}
            <section className="border-muted bg-card rounded-lg border p-4 shadow-sm">
                <div className="mb-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                        <h3 className="text-sm font-medium">Slots do dia</h3>
                        <p className="text-muted-foreground text-xs">
                            Selecione uma data para ver os horários gerados pelas regras.
                        </p>
                    </div>
                    <div className="w-full max-w-xs">
                        <LabeledInput
                            label="Data"
                            name="date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>

                {generatedSlots.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum slot para esta data.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b text-xs text-muted-foreground">
                                <tr>
                                    <th className="py-2">Horário</th>
                                    <th className="py-2">Quadra</th>
                                    <th className="py-2">Preço</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {generatedSlots.map((s) => (
                                    <tr key={s.id} className="align-middle">
                                        <td className="py-2">{s.time}</td>
                                        <td className="py-2">{s.court}</td>
                                        <td className="py-2">R$ {s.price.toFixed(2)}</td>
                                        <td className="py-2">
                                            {s.available ? (
                                                <span className="text-green-600">Disponível</span>
                                            ) : (
                                                <span className="text-red-600">Indisponível</span>
                                            )}
                                        </td>
                                        <td className="py-2 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => toggleSlot(s)}>
                                                    {s.available ? "Bloquear" : "Liberar"}
                                                </Button>
                                                <Button size="sm">Reservar</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <footer className="text-muted-foreground text-xs">
                Dica: conecte esta tela à sua API de reservas para persistir regras e estados dos slots.
            </footer>
        </div>
    )
}

const WEEK_DAYS = [
    { value: 0, label: "Domingo", short: "Dom" },
    { value: 1, label: "Segunda", short: "Seg" },
    { value: 2, label: "Terça", short: "Ter" },
    { value: 3, label: "Quarta", short: "Qua" },
    { value: 4, label: "Quinta", short: "Qui" },
    { value: 5, label: "Sexta", short: "Sex" },
    { value: 6, label: "Sábado", short: "Sáb" },
]

function toMinutes(hhmm: string): number {
    const [h, m] = hhmm.split(":").map(Number)
    return h * 60 + m
}

function fromMinutes(mins: number): string {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

function formatDays(days: number[]): string {
    if (days.length === 7) return "Todos os dias"
    return days
        .slice()
        .sort()
        .map((d) => WEEK_DAYS.find((w) => w.value === d)?.short ?? String(d))
        .join(", ")
}

function cryptoRandomId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        // @ts-ignore
        return crypto.randomUUID() as string
    }
    return Math.random().toString(36).slice(2)
}

//