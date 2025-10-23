'use client'
import { Court, CourtModal } from "@/components/modal/cadastrarQuadras";
import { Button } from "@/components/ui/button";
import CardQuadra from "./cardQuadra";

import { motion } from "framer-motion";
import { useState } from "react";

import { CONTAINER, ITEM_ANIMATION_DOWN } from "@/animation";
import HorariosDetalhadosModal, { HorarioMap } from "@/components/modal/horarios";
import { HiPlusSm } from "react-icons/hi";

export default function MinhasQuadras() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalHorarioOpen, setIsModalHorarioOpen] = useState(false);
    const [court, setCourt] = useState<Court | null>(null);

    const handleHorarioSave = (horarios: HorarioMap) => {
        setCourt((prev) => (prev ? { ...prev, horarios } : prev));
        setIsModalHorarioOpen(false);
    };

    const horariosMock: HorarioMap = {
        segunda: { abertura: "08:00", fechamento: "20:00" },
        terca: { abertura: "08:00", fechamento: "20:00" },
        quarta: { abertura: "08:00", fechamento: "22:00" },
        quinta: { abertura: "08:00", fechamento: "22:00" },
        sexta: { abertura: "08:00", fechamento: "23:00" },
        sabado: { abertura: "09:00", fechamento: "18:00" },
        domingo: { abertura: "09:00", fechamento: "14:00" },
    };
    return (
        <div className="border shadow-md lg:px-10 px-4 py-6 rounded-2xl bg-white">
            <motion.div
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center pb-2 lg:pb-4">
                <motion.h2
                    variants={ITEM_ANIMATION_DOWN}
                    className="lg:text-2xl text-lg font-bold ">
                    Minhas Quadras
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    <Button
                        onClick={() => { setIsModalOpen(true), setCourt(null) }}
                        className=' bg-primary hover:bg-violet-600 '>
                        <HiPlusSm />
                        <span className="hidden lg:block"> Cadastrar Quadra</span>
                    </Button>
                </motion.div>
            </motion.div>


            <motion.div variants={CONTAINER} >
                <motion.div initial="hidden" animate="visible" className="grid lg:grid-cols-2 lg:gap-3">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <CardQuadra
                            key={index}
                            index={index}
                            onEdit={() => { setIsModalOpen(true), setCourt({ id: index, name: `Quadra ${index + 1}`, type: 'Grama Sintética' }) }}
                            onDelete={() => { }}
                            onSchedule={() => {
                                setIsModalHorarioOpen(true);
                                setCourt({
                                    id: index,
                                    name: `Quadra ${index + 1}`,
                                    type: 'Grama Sintética',
                                    horarios: horariosMock,
                                });
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            <CourtModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
                onSave={() => { }}
                court={court}
            />

            <HorariosDetalhadosModal
                isOpen={isModalHorarioOpen}
                onClose={() => { setIsModalHorarioOpen(false) }}
                onSave={handleHorarioSave}
                initialValue={court?.horarios}
            />
        </div>
    )
}