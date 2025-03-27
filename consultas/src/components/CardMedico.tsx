/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Doctor } from "@/app/lib";

interface CardMedicoProps {
  className?: string;
  props: Doctor;
}

const CardMedico = ({ className, props }: CardMedicoProps) => {
  return (
    <div
      className={cn(
        "w-64 border shadow-md p-4 rounded-lg flex flex-col gap-4",
        className
      )}
    >
      <img
        src="/doctors.jpg"
        alt="doctor"
        className="w-full h-56 object-cover rounded-md"
      />
      <div>
        <h3 className="text-lg font-bold">{props.name}</h3>
        <p className="text-sm text-gray-500">{props.especialidade}</p>
      </div>
      <Button className="" asChild>
        <Link href={`medico/${props.id}`}>Marcar Consulta</Link>
      </Button>
    </div>
  );
};

export default CardMedico;
