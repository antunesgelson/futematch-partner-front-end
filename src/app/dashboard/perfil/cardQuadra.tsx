import { ITEM_ANIMATION_UP } from "@/animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { BsTrash3 } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

type Props = {
    index: number;
    onEdit?: () => void;
    onDelete?: () => void;
    onSchedule?: () => void;
}
export default function CardQuadra({ index, onEdit, onDelete, onSchedule }: Props) {
    return (
        <motion.div variants={ITEM_ANIMATION_UP} className="border p-4 rounded-lg mb-4 bg-sidebar">
            <h3 className="text-lg font-semibold">Quadra {index + 1}</h3>
            <p className="text-sm">Tipo: Futebol Society</p>
            <p className="text-sm">Dimensões: 20m x 40m</p>

            <div className="flex justify-between py-4 gap-3">
                <Button
                    className="flex-1"
                    variant={'outline'}
                    onClick={onEdit}>
                    <FaPenToSquare />
                    Editar
                </Button>
                <Button
                    className="flex-1"
                    variant={'outline'}
                    onClick={onSchedule}>
                    <MdOutlineAccessTimeFilled />
                    Horários
                </Button>
                <Button
                    size={'icon-sm'}
                    variant={'destructive'}
                    onClick={onDelete}>
                    <BsTrash3 />
                </Button>
            </div>
        </motion.div>
    )
}