"use client"

import { ChartContainer, ChartHeader, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo } from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts"

export default function RelatoriosPage() {
	const receitaMensal = useMemo(
		() => [
			{ mes: "Jan", receita: 4200 },
			{ mes: "Fev", receita: 5300 },
			{ mes: "Mar", receita: 4800 },
			{ mes: "Abr", receita: 6100 },
			{ mes: "Mai", receita: 7200 },
			{ mes: "Jun", receita: 6900 },
		],
		[]
	)

	const reservasPorQuadra = useMemo(
		() => [
			{ quadra: "Quadra 1", reservas: 120 },
			{ quadra: "Quadra 2", reservas: 95 },
			{ quadra: "Quadra 3", reservas: 68 },
		],
		[]
	)

	const ocupacaoSemanal = useMemo(
		() => [
			{ dia: "Seg", ocupacao: 62 },
			{ dia: "Ter", ocupacao: 70 },
			{ dia: "Qua", ocupacao: 74 },
			{ dia: "Qui", ocupacao: 80 },
			{ dia: "Sex", ocupacao: 85 },
			{ dia: "Sáb", ocupacao: 90 },
			{ dia: "Dom", ocupacao: 66 },
		],
		[]
	)

	const meiosPagamento = useMemo(
		() => [
			{ name: "Pix", value: 45 },
			{ name: "Crédito", value: 30 },
			{ name: "Débito", value: 18 },
			{ name: "Dinheiro", value: 7 },
		],
		[]
	)

	const corConfig = {
		receita: { label: "Receita", color: "var(--color-chart-1)" },
		reservas: { label: "Reservas", color: "var(--color-chart-2)" },
		ocupacao: { label: "Ocupação", color: "var(--color-chart-3)" },
		pix: { label: "Pix", color: "var(--color-chart-1)" },
		credito: { label: "Crédito", color: "var(--color-chart-2)" },
		debito: { label: "Débito", color: "var(--color-chart-3)" },
		dinheiro: { label: "Dinheiro", color: "var(--color-chart-4)" },
	} as const

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
			<header className="flex flex-col gap-1">
				<h2 className="text-xl font-semibold">Relatórios</h2>
				<p className="text-muted-foreground text-sm">Acompanhe o desempenho da sua quadra.</p>
			</header>

			{/* KPIs */}
			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<KPI title="Receita do mês" value="R$ 7.200" sub="↑ 12% vs mês anterior" />
				<KPI title="Reservas no mês" value="235" sub="↑ 8% vs mês anterior" />
				<KPI title="Taxa de ocupação" value="78%" sub="↑ 3 p.p. na semana" />
				<KPI title="Ticket médio" value="R$ 61,20" sub="↓ 2% vs mês anterior" />
			</section>

			{/* Charts */}
			<section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<ChartContainer className="lg:col-span-2" config={{ receita: corConfig.receita }}>
					<ChartHeader title="Receita mensal" description="Valores consolidados dos últimos 6 meses" />
					<div className="h-[280px] w-full">
						<ResponsiveContainer>
							<AreaChart data={receitaMensal} margin={{ left: 8, right: 8, top: 10 }}>
								<defs>
									<linearGradient id="grad-receita" x1="0" x2="0" y1="0" y2="1">
										<stop offset="5%" stopColor="var(--color-receita)" stopOpacity={0.25} />
										<stop offset="95%" stopColor="var(--color-receita)" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
								<XAxis dataKey="mes" tickLine={false} axisLine={false} />
								<YAxis tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Area name="Receita" type="monotone" dataKey="receita" stroke="var(--color-receita)" fill="url(#grad-receita)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</ChartContainer>

				<ChartContainer config={{ reservas: corConfig.reservas }}>
					<ChartHeader title="Reservas por quadra" description="Últimos 30 dias" />
					<div className="h-[280px] w-full">
						<ResponsiveContainer>
							<BarChart data={reservasPorQuadra} margin={{ left: 8, right: 8, top: 10 }}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
								<XAxis dataKey="quadra" tickLine={false} axisLine={false} />
								<YAxis tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Bar name="Reservas" dataKey="reservas" fill="var(--color-reservas)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</ChartContainer>
			</section>

			<section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<ChartContainer className="lg:col-span-1" config={{ ocupacao: corConfig.ocupacao }}>
					<ChartHeader title="Ocupação semanal" description="% de ocupação por dia" />
					<div className="h-[260px] w-full">
						<ResponsiveContainer>
							<BarChart data={ocupacaoSemanal} margin={{ left: 8, right: 8, top: 10 }}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
								<XAxis dataKey="dia" tickLine={false} axisLine={false} />
								<YAxis tickFormatter={(v: number) => `${v}%`} tickLine={false} axisLine={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Bar name="Ocupação" dataKey="ocupacao" fill="var(--color-ocupacao)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</ChartContainer>

				<ChartContainer className="lg:col-span-2" config={{ pix: corConfig.pix, credito: corConfig.credito, debito: corConfig.debito, dinheiro: corConfig.dinheiro }}>
					<ChartHeader title="Meios de pagamento" description="Participação no mês" />
					<div className="h-[260px] w-full">
						<ResponsiveContainer>
							<PieChart>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
												<Pie
													data={meiosPagamento}
													dataKey="value"
													nameKey="name"
													outerRadius={90}
													innerRadius={52}
													paddingAngle={4}
												>
													{meiosPagamento.map((entry) => (
														<Cell
															key={entry.name}
															fill={
																entry.name === "Pix"
																	? "var(--color-pix)"
																	: entry.name === "Crédito"
																		? "var(--color-credito)"
																		: entry.name === "Débito"
																			? "var(--color-debito)"
																			: "var(--color-dinheiro)"
															}
														/>
													))}
												</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>
					{/* Legend is generated via ChartLegend above */}
				</ChartContainer>
			</section>
		</div>
	)
}

function KPI({ title, value, sub }: { title: string; value: string; sub?: string }) {
	return (
		<div className="bg-card text-card-foreground border-muted rounded-lg border p-4">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="mt-1 text-2xl font-semibold">{value}</p>
			{sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
		</div>
	)
}

//

