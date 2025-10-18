"use client";
import Background from '@/assets/background/teste.png';
import Logo from '@/assets/logo/logo.png';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/labeled-input';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';



export default function LoginPage() {
    const container = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.08 }
        }
    } as const;

    const item = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    } as const;

    const imageReveal = {
        hidden: { opacity: 0, scale: 1.02 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    } as const;

    return (
        <main className="min-h-screen w-full grid grid-cols-12">
            <motion.section
                variants={container}
                className="col-span-6 relative h-full"
                style={{ backgroundColor: 'color(srgb 0.1886 0.1019 0.1471)' }}
                initial="hidden"
                animate="visible">
                <Image
                    src={Background}
                    alt="Login"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </motion.section>
            <motion.section
                className="col-span-6 flex flex-col justify-center items-center  w-7/12 mx-auto"
                initial="hidden"
                animate="visible"

                viewport={{ once: true, amount: 0.2 }}>
                <motion.div variants={item}>
                    <Image
                        src={Logo}
                        alt="Login"
                        width={300}
                        height={300}
                    />
                </motion.div>
                <motion.div variants={item} className='w-full pb-6 '>
                    <h1 className='text-2xl font-semibold'>Portal do Parceiro</h1>
                    <h2 className='text-sm'>Gerencie sua quadra de forma <strong>fácil</strong> e <strong>rápida</strong></h2>
                </motion.div>

                <div className='w-full space-y-3'>
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
                            autoComplete="current-password"
                            required
                        />
                    </motion.div>
                    <motion.div variants={item}>
                        <Link href="/signin/forgot-password" className='text-sm text-violet-500   underline-offset-2 font-semibold  hover:underline flex justify-end w-full mt-2'>
                            Esqueci minha senha?
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}>
                        <Link href={'/dashboard'}>
                            <Button className='w-full bg-violet-500 hover:bg-violet-600 h-10'>
                                Entrar
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div variants={item} className=' text-center text-sm'>
                        <Link href="/signup" className='text-gray-600 hover:text-gray-800 '>
                            Ainda não tem conta? <span className='text-violet-500 hover:underline underline-offset-2 font-semibold'>Cadastre sua quadra</span>
                        </Link>
                    </motion.div>
                </div>

            </motion.section>
        </main>
    );
}
