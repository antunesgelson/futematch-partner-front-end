import { useCallback } from 'react';

const useFormatters = () => {
    const cpfFormat = useCallback((cpf: string) => {
    if (!cpf) return cpf;
    // keep only digits and limit to 11 (CPF has 11 digits)
    const cleaned = cpf.replace(/\D/g, '').slice(0, 11);

    const part1 = cleaned.substring(0, 3);
    const part2 = cleaned.substring(3, 6);
    const part3 = cleaned.substring(6, 9);
    const part4 = cleaned.substring(9, 11);

    if (cleaned.length <= 3) return part1;
    if (cleaned.length <= 6) return `${part1}.${part2}`;
    if (cleaned.length <= 9) return `${part1}.${part2}.${part3}`;
    return `${part1}.${part2}.${part3}-${part4}`;
    }, []);

    const cellPhoneFormat = useCallback((phone: string) => {
        if (!phone) return phone;
    // keep only digits and limit to 11 (DDD + 9 digits)
    const cleaned = phone.replace(/\D/g, '').slice(0, 11);
        let formatted = cleaned;

        if (cleaned.length > 0) {
            formatted = `(${cleaned.substring(0, 2)}`;
        }
        if (cleaned.length >= 3) {
            formatted += `) ${cleaned.substring(2, 7)}`;
        }
        if (cleaned.length >= 8) {
            formatted += `-${cleaned.substring(7, 11)}`;
        }
        return formatted;
    }, []);

    const homePhoneFormat = useCallback((phone: string) => {
        if (!phone) return phone;
        const cleaned = phone.replace(/\D/g, '');
        let formatted = cleaned;

        if (cleaned.length > 0) {
            formatted = `(${cleaned.substring(0, 2)}`;
        }
        if (cleaned.length >= 3) {
            formatted += `) ${cleaned.substring(2, 6)}`; // 4 dígitos após o DDD
        }
        if (cleaned.length >= 7) {
            formatted += `-${cleaned.substring(6, 10)}`; // 4 dígitos finais
        }
        return formatted;
    }, []);

    const cepFormat = useCallback((cep: string) => {
        if (!cep) return cep;
        const cleaned = cep.replace(/\D/g, '');
        let formatted = cleaned;

        if (cleaned.length >= 5) {
            formatted = `${cleaned.substring(0, 5)}-${cleaned.substring(5, 8)}`;
        }

        return formatted;
    }, []);

    return { cpfFormat, cellPhoneFormat, homePhoneFormat, cepFormat };
};

export default useFormatters;