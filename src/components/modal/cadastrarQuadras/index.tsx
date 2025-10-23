import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import type { HorarioMap } from "@/components/modal/horarios";
import { HiPlusSm } from "react-icons/hi";


export interface Court {
    id: number;
    name: string;
    type: string;
    dimensions?: string;
    horarios?: HorarioMap;
}
interface CourtModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (courtData: Omit<Court, "id">) => void;
    court: Court | null;
}

export const CourtModal = ({
    isOpen,
    onClose,
    onSave,
    court,
}: CourtModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        dimensions: "",
    });

    useEffect(() => {
        if (court) {
            setFormData({
                name: court.name,
                type: court.type,
                dimensions: court.dimensions || "",
            });
        } else {
            setFormData({ name: "", type: "", dimensions: "" });
        }
    }, [court, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ name: "", type: "", dimensions: "" });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        {court ? "Editar Quadra" : "Cadastrar Nova Quadra"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="courtName" className="text-muted-foreground">
                            Nome da Quadra
                        </Label>
                        <Input
                            id="courtName"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Ex: Quadra 1"
                            required
                        />
                    </div>
                    <div>
                        <div className="space-y-2">
                            <Label htmlFor="courtType" className="text-muted-foreground">
                                Tipo da Quadra
                            </Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, type: value })
                                }>
                                <SelectTrigger id="courtType">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Grama Natural">Grama Natural</SelectItem>
                                    <SelectItem value="Grama Sintética">Grama Sintética</SelectItem>
                                    <SelectItem value="Futsal">Futsal</SelectItem>
                                    <SelectItem value="Society">Society</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dimensions" className="text-muted-foreground">
                                Dimensões (opcional)
                            </Label>
                            <Input
                                id="dimensions"
                                value={formData.dimensions}
                                onChange={(e) =>
                                    setFormData({ ...formData, dimensions: e.target.value })
                                }
                                placeholder="Ex: 40x20m"
                            />
                        </div>
                        {!court && <HorarioFuncionamento />}
                    </div>


                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary text-primary-foreground hover:opacity-90">
                            {court ? "Salvar alterações" : "Cadastrar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};



const diasDaSemana = [
    { label: "D", value: "domingo" },
    { label: "S", value: "segunda" },
    { label: "T", value: "terca" },
    { label: "Q", value: "quarta" },
    { label: "Q", value: "quinta" },
    { label: "S", value: "sexta" },
    { label: "S", value: "sabado" },
];

export default function HorarioFuncionamento() {
    const [diaSelecionado, setDiaSelecionado] = useState<string[]>([]);
    const [abertura, setAbertura] = useState("");
    const [fechamento, setFechamento] = useState("");
    const [horarios, setHorarios] = useState<HorarioPayload[]>([]);
    const [timeError, setTimeError] = useState<string | null>(null);

    const canAddHorario =
        abertura !== "" &&
        fechamento !== "" &&
        diaSelecionado.length > 0;

    const toggleDia = (diaValor: string) => {
        setDiaSelecionado((prev) =>
            prev.includes(diaValor)
                ? prev.filter((d) => d !== diaValor)
                : [...prev, diaValor]
        );
    };

    const handleAddHorario = () => {
        if (!canAddHorario) {
            return;
        }

        const aberturaMinutos = horarioParaMinutos(abertura);
        const fechamentoMinutos = horarioParaMinutos(fechamento);

        if (aberturaMinutos >= fechamentoMinutos) {
            setTimeError("O horário de abertura deve ser anterior ao de fechamento.");
            return;
        }

        const diasOrdenados = diasDaSemana
            .map((dia) => dia.value)
            .filter((value) => diaSelecionado.includes(value));

        setHorarios((prev) => [
            ...prev,
            {
                abertura,
                fechamento,
                dias: diasOrdenados,
            },
        ]);

        setDiaSelecionado([]);
        setAbertura("");
        setFechamento("");
        setTimeError(null);
    };

    return (
        <div className=" mt-4">
            <div className="w-full  bg-white  ">
                {/* Header */}
                <div className="flex items-center mb-4">
                    <h2 className=" text-lg font-semibold text-gray-800">
                        Horários de Funcionamento
                    </h2>
                </div>

                {/* Campos de horário */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Abertura</label>
                        <Input
                            type="number"
                            value={abertura}
                            onChange={(event) => setAbertura(event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/60"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Fechamento</label>
                        <Input
                            type="number"
                            value={fechamento}
                            onChange={(event) => setFechamento(event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/60"
                        />
                    </div>
                </div>

                {/* Dias da semana */}
                <div className="flex justify-between mb-6 mx-2">
                    {diasDaSemana.map((dia) => (
                        <button
                            key={dia.value}
                            type="button"
                            onClick={() => toggleDia(dia.value)}
                            className={`w-8 h-8 rounded-full border-4 border-gray-300 flex items-center justify-center transition-all 
              ${diaSelecionado.includes(dia.value)
                                    ? "border-primary text-primary font-extrabold bg-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}>
                            {dia.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {horarios.length === 0 ? (
                        <span className="col-span-2 text-xs text-muted-foreground">
                            Defina o horário, selecione os dias e clique em "Adicionar Horário".
                        </span>
                    ) : (
                        horarios.map((horario, index) => (
                            <HorarioCard
                                key={`${horario.abertura}-${horario.fechamento}-${index}`}
                                abertura={horario.abertura}
                                fechamento={horario.fechamento}
                                dias={horario.dias}
                            />
                        ))
                    )}
                </div>

                {/* Botão salvar */}
                <Button
                    className="w-full"
                    type="button"
                    onClick={handleAddHorario}
                    disabled={!canAddHorario}>
                    <HiPlusSm />
                    Adicionar Horário
                </Button>
                {timeError && (
                    <span className="mt-2 block text-sm text-destructive">{timeError}</span>
                )}
            </div>
        </div>
    );
}



interface HorarioCardProps {
    abertura: string;
    fechamento: string;
    dias: string[];
}

interface HorarioPayload {
    abertura: string;
    fechamento: string;
    dias: string[];
}

const horarioParaMinutos = (horario: string) => {
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
};


export function HorarioCard({
    abertura,
    fechamento,
    dias,
}: HorarioCardProps) {
    return (
        <div className=" flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mb-4">
            {/* Horário principal */}
            <div className="flex justify-center flex-col gap-1  w-full">
                <p className="text-2xl font-semibold text-gray-900">
                    {abertura} - {fechamento}
                </p>
                {/* Dias da semana */}
                <div className="flex justify-between items-center gap-1 text-gray-400 text-lg tracking-wide mr-4">
                    {diasDaSemana.map((dia) => {
                        const ativo = dias.includes(dia.value);
                        return (
                            <div
                                key={dia.value}
                                className="flex flex-col items-center ">
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${ativo ? "bg-primary" : "invisible"
                                        }`} />
                                <span
                                    className={`${ativo ? "text-primary font-medium" : "opacity-40"
                                        }`}>
                                    {dia.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
    );
}

