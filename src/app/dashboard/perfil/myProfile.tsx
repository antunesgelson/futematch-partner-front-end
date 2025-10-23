'use client'
import { ITEM_ANIMATION_DOWN } from "@/animation";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";

import { motion } from "framer-motion";

import { HiSave } from "react-icons/hi";


export default function MyProfile() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="border shadow-md lg:px-10 px-4 py-6 rounded-2xl bg-white">
            <motion.h1 variants={ITEM_ANIMATION_DOWN} className="lg:text-2xl text-lg font-bold pb-4 ">Meu Perfil</motion.h1>
            <div className=' gap-3 grid grid-cols-6'>
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="razaoSocial"
                        label="Razão social"
                        placeholder="ABC Esportes LTDA"
                        required
                    />
                </motion.div>

                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="cnpj"
                        label="CNPJ"
                        placeholder="00.000.000/0000-00"
                        autoComplete="cnpj"
                        required
                    />
                </motion.div>
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="telefone"
                        type="tel"
                        label="Telefone"
                        placeholder="(00) 00000-0000"
                        autoComplete="telefone"
                        required
                    />
                </motion.div>
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="email"
                        type="email"
                        label="E-mail"
                        placeholder="seuemail@exemplo.com"
                        autoComplete="email"
                        required
                    />
                </motion.div>
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5 }}>
                    <LabeledInput
                        name="password"
                        type="password"
                        label="Senha"
                        placeholder="••••••••"
                        autoComplete="password"
                        required
                    />
                </motion.div>
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5 }}>
                    <LabeledInput
                        name="password"
                        type="password"
                        label="Confirmar Senha"
                        placeholder="••••••••"
                        autoComplete="password"
                        required
                    />
                </motion.div>

                <motion.div
                    className="flex justify-end  col-span-6"
                    initial={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    <Button
                        className=' bg-primary hover:bg-violet-600 '>
                        <HiSave />
                        Salvar Alterações
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}