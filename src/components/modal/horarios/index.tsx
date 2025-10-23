'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type HorarioMap = Record<string, { abertura: string; fechamento: string }>; // { domingo: { abertura, fechamento } }

interface HorariosModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (horarios: HorarioMap) => void;
	initialValue?: HorarioMap;
}

interface DiaHorario {
	value: string;
	label: string;
	abreviacao: string;
	ativo: boolean;
	abertura: string;
	fechamento: string;
}

const diasDaSemana: Array<{ value: string; label: string; abreviacao: string }> = [
	{ label: 'Domingo', value: 'domingo', abreviacao: 'D' },
	{ label: 'Segunda-feira', value: 'segunda', abreviacao: 'S' },
	{ label: 'Terça-feira', value: 'terca', abreviacao: 'T' },
	{ label: 'Quarta-feira', value: 'quarta', abreviacao: 'Q' },
	{ label: 'Quinta-feira', value: 'quinta', abreviacao: 'Q' },
	{ label: 'Sexta-feira', value: 'sexta', abreviacao: 'S' },
	{ label: 'Sábado', value: 'sabado', abreviacao: 'S' },
];

const buildStateFromInitial = (initial?: HorarioMap): DiaHorario[] =>
	diasDaSemana.map((dia) => ({
		value: dia.value,
		label: dia.label,
		abreviacao: dia.abreviacao,
		ativo: Boolean(initial?.[dia.value]),
		abertura: initial?.[dia.value]?.abertura ?? '',
		fechamento: initial?.[dia.value]?.fechamento ?? '',
	}));

export const HorariosDetalhadosModal = ({
	isOpen,
	onClose,
	onSave,
	initialValue,
}: HorariosModalProps) => {
	const [horarios, setHorarios] = useState<DiaHorario[]>(() => buildStateFromInitial(initialValue));
	const [validationError, setValidationError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		setHorarios(buildStateFromInitial(initialValue));
		setValidationError(null);
	}, [initialValue, isOpen]);

	const diasAtivos = useMemo(() => horarios.filter((dia) => dia.ativo), [horarios]);

	const isFormValid = useMemo(() => {
		if (diasAtivos.length === 0) {
			return false;
		}

		return diasAtivos.every((dia) =>
			dia.abertura !== '' &&
			dia.fechamento !== '' &&
			dia.abertura < dia.fechamento,
		);
	}, [diasAtivos]);

	const toggleDia = (value: string) => {
		setHorarios((prev) =>
			prev.map((dia) =>
				dia.value === value
					? {
						...dia,
						ativo: !dia.ativo,
						abertura: dia.ativo ? '' : dia.abertura,
						fechamento: dia.ativo ? '' : dia.fechamento,
					}
					: dia,
			),
		);
		setValidationError(null);
	};

	const updateHorario = (value: string, field: 'abertura' | 'fechamento', time: string) => {
		setHorarios((prev) =>
			prev.map((dia) =>
				dia.value === value
					? {
						...dia,
						[field]: time,
					}
					: dia,
			),
		);
		setValidationError(null);
	};

	const handleSave = () => {
		if (!isFormValid) {
			setValidationError(
				diasAtivos.length === 0
					? 'Selecione ao menos um dia com horário definido.'
					: 'Confira os horários informados: o início deve ser anterior ao fim em todos os dias ativos.',
			);
			return;
		}

		const payload: HorarioMap = {};
		diasAtivos.forEach((dia) => {
			payload[dia.value] = {
				abertura: dia.abertura,
				fechamento: dia.fechamento,
			};
		});

		onSave(payload);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-xl sm:max-h-[80vh]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold">Horários de funcionamento</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Selecione os dias de funcionamento e ajuste os horários de abertura e fechamento.
					</p>

					<div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
						{horarios.map((dia) => (
							<div
								key={dia.value}
								className={`rounded-lg border p-3 transition-colors ${dia.ativo ? 'border-primary/70 bg-primary/5' : 'border-muted'}`}>
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<p className="text-sm font-medium text-foreground">{dia.label}</p>
										<span className="text-xs text-muted-foreground">
											{dia.ativo ? 'Dia ativo' : 'Dia marcado como fechado'}
										</span>
									</div>
									<Button
										type="button"
										size="sm"
										variant={dia.ativo ? 'default' : 'outline'}
										onClick={() => toggleDia(dia.value)}>
										{dia.ativo ? 'Aberto' : 'Fechado'}
									</Button>
								</div>

								{dia.ativo && (
									<div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div className="space-y-1.5">
											<Label htmlFor={`abertura-${dia.value}`}>Abertura</Label>
											<Input
												id={`abertura-${dia.value}`}
												type="time"
												value={dia.abertura}
												onChange={(event) => updateHorario(dia.value, 'abertura', event.target.value)}
											/>
										</div>
										<div className="space-y-1.5">
											<Label htmlFor={`fechamento-${dia.value}`}>Fechamento</Label>
											<Input
												id={`fechamento-${dia.value}`}
												type="time"
												value={dia.fechamento}
												onChange={(event) => updateHorario(dia.value, 'fechamento', event.target.value)}
												min={dia.abertura}
											/>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{validationError && (
						<span className="block text-sm text-destructive">{validationError}</span>
					)}
				</div>

				<DialogFooter className="gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="button" onClick={handleSave} disabled={diasAtivos.length === 0}>
						Salvar horários
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export type { HorarioMap };
export default HorariosDetalhadosModal;
