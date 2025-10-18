import { Progress } from "@/components/ui/progress";

type Props = {
    step?: number;
    current?: number;
}
export default function StepProgress({ step, current }: Props) {
    return (
        <Progress value={current && step ? (current / step) * 100 : 0} className="w-full " />

    )
}