"use client";
import Logo from '@/assets/logo/logo.png';
import map from '@/assets/maps/map.jpg';
import StepProgress from '@/components/stepprogress';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/ui/labeled-input';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    setStep: Dispatch<SetStateAction<number>>;
}

export default function Step1({ setStep }: Props) {
    const [showMap, setShowMap] = useState(false);
    const item = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    } as const;



    return (
        <motion.section
            className=""
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
                <StepProgress current={3} step={3} />
            </motion.div>
            <motion.div variants={item} className='w-full py-3 '>
                <h1 className='text-2xl font-semibold'>Endereço da Quadra</h1>
                <h2 className='text-sm'>preencha as informações de endereço de seu estabelecimento</h2>
            </motion.div>

            <div className='w-full grid grid-cols-6 gap-3'>

                <motion.div
                    className='col-span-3'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="cep"
                        label="CEP"
                        type='number'
                        placeholder="00.000-000"
                        required
                    />
                </motion.div>

                <motion.div
                    className='col-span-3'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="uf"
                        label="UF"
                        placeholder="SC"
                        maxLength={2}
                        className='uppercase'
                        required
                    />
                </motion.div>

                <motion.div
                    className='col-span-6'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="endereco"
                        label="Endereço"
                        placeholder="Rua Exemplo"
                        required
                    />
                </motion.div>

                <motion.div
                    className='col-span-6'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="bairro"
                        label="Bairro"
                        placeholder="Centro"
                        required
                    />
                </motion.div>

                <motion.div
                    className='col-span-4'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="cidade"
                        label="Cidade"
                        placeholder="Florianópolis"
                        required
                    />
                </motion.div>

                <motion.div
                    className='col-span-2'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}>
                    <LabeledInput
                        name="numero"
                        label="Nº"
                        type='number'
                        placeholder="123"
                        required
                    />
                </motion.div>

                {showMap &&
                    <div className='col-span-6'>
                        <h3 className='text-primary text-sm'>
                            Revise sua localização abaixo, caso esteja divergente com seus
                            dados acima. clique no mapa e corrija a localização de maneira correta
                        </h3>
                        <Image className='rounded-2xl' src={map} alt="Mapa" />
                    </div>}
            </div>
            <motion.div
                className=' my-2 w-full'
                initial={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}>
                <Link href={'/dashboard'}>
                    <Button
                        className='w-full bg-primary hover:bg-violet-600 h-10 '>
                        Finalizar
                    </Button>
                </Link>
            </motion.div>
        </motion.section>
    );
}
