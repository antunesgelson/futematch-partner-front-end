"use client";
import { CONTAINER } from '@/animation';
import Step1 from '@/app/(sign)/signup/step1';
import Background from '@/assets/background/teste.png';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useState } from 'react';
import Step2 from './step2';
import Step3 from './step3';



export default function Signup() {
    const [step, setStep] = useState(1);


    return (
        <main className="min-h-screen w-full grid grid-cols-12">
            <motion.section
                variants={CONTAINER}
                className="md:col-span-6 relative h-full hidden md:block"
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
            <div className='md:col-span-6 col-span-12 md:w-7/12 mx-auto md:px-0 px-10'>
                {step === 1 && <Step1 setStep={setStep} />}
                {step === 2 && <Step2 setStep={setStep} />}
                {step === 3 && <Step3 setStep={setStep} />}
            </div>
        </main>
    );
}
