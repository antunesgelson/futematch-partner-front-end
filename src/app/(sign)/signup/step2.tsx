"use client";
import Logo from '@/assets/logo/logo.png';
import StepProgress from '@/components/stepprogress';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { motion } from 'framer-motion';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setStep: Dispatch<SetStateAction<number>>;
}
export default function Step2({ setStep }: Props) {


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
                <StepProgress current={2} step={3} />
            </motion.div>
            <motion.div variants={item} className='w-full py-3 '>
                <h1 className='text-2xl font-semibold'>Validação</h1>
                <h2 className='text-sm'>Use o código que foi enviado no seu email.</h2>
            </motion.div>

            <div className='w-full space-y-3'>
                <h3 className='text-xs text-primary'>Falta pouco para finalizar seu cadastro! Insira o código que foi enviado no seu email e depois clique em validar.</h3>
                <motion.div
                    className='w-full'
                    initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5 }}>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className='flex justify-end py-2'>
                        <span className='text-xs '>tempo restante: <strong className='text-primary'>01:23</strong></span>
                    </div>

                    <div className='flex justify-between items-center text-sm'>
                        <span className='text-primary font-semibold'>Não recebeu o código?</span>
                        <Button className=' text-secondary rounded-3xl'>Reenviar código</Button>
                    </div>
                </motion.div>
                <Button
                    className='h-10 w-full'
                    onClick={() => { setStep((prev) => prev + 1) }}>
                    Validar
                </Button>
            </div>
        </motion.section>
    );
}
