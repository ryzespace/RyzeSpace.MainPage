import Image from "next/image";

type LogoProps = {
    className?: string;
};

export function Logo({ className }: LogoProps) {
    return (
        <Image
            src="/logo-temp.png"
            alt="RyzeSpace"
            width={40}
            height={40}
            className={className}
            priority
        />
    );
}