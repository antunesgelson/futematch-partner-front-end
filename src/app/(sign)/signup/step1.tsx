"use client";
import Logo from '@/assets/logo/logo.png';
import StepProgress from '@/components/stepprogress';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/labeled-input';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setStep: Dispatch<SetStateAction<number>>;
}

export default function Step1({ setStep }: Props) {
    const item = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    } as const;



    return (
        <motion.section
            className="col-span-6 flex flex-col justify-center items-center  w-7/12 mx-auto"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}>
            <motion.div variants={item} className='w-full flex flex-col justify-center items-center'>
                <Image
                    src={Logo}
                    alt="Login"
                    width={300}
                    height={300}
                />
                <StepProgress current={1} step={3} />
            </motion.div>
            <motion.div variants={item} className='w-full py-3 '>
                <h1 className='text-2xl font-semibold'>Cadastre sua quadra</h1>
                <h2 className='text-sm'>Entre e ganhe a primeira mensalidade grátis</h2>
            </motion.div>

            <div className='w-full space-y-3'>
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="quadra"
                        label="Nome da Quadra"
                        placeholder="centro esportivo"
                        required
                    />
                </motion.div>

                <motion.div
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
                    initial={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}>
                    <Button
                        className='w-full bg-primary hover:bg-violet-600 h-10'
                        onClick={() => setStep((prev: number) => prev + 1)}
                    >
                        Cadastrar
                    </Button>
                </motion.div>

                <motion.div variants={item} className=' text-center text-sm'>
                    <Link href="/signin" className='text-gray-600 hover:text-gray-800 '>
                        Já possui conta ?<span className='text-primary hover:underline underline-offset-2 font-semibold'>Entrar agora</span>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}
