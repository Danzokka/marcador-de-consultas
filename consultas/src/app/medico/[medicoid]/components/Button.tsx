"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ButtonClientProps {
  isLoggedIn: boolean;
}

export default function ButtonClient({ isLoggedIn }: ButtonClientProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para marcar uma consulta.");
      router.push("/auth/login");
    }
  };

  return (
    <DialogTrigger asChild>
      <Button className="font-semibold" onClick={handleClick}>
        Marcar consulta
      </Button>
    </DialogTrigger>
  );
}
