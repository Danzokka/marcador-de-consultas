"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import CardMedico from "./CardMedico";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Doctor } from "@/app/lib";

const BuscaCategoria = ({doctors}: {doctors: Doctor[]}) => {
  const [pesquisa, setPesquisa] = React.useState("");


  const handlePesquisa = (e: any) => {
    setPesquisa(e.target.value);
  };

  const medicosFiltrados = doctors.filter((medico) => {
    return medico.especialidade.toLowerCase().includes(pesquisa.toLowerCase());
  });

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h2 className="font-bold text-4xl tracking-wide">
        Procure por <span className="text-primary">Médicos</span>
      </h2>
      <h3 className="text-xl tracking-wider">
        Procure por um médico e marque sua consulta
      </h3>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Pesquise por médicos"
          onChange={handlePesquisa}
        />
        <Button type="submit">
          {" "}
          <Search className="" /> Buscar
        </Button>
      </div>

      <Carousel opts={{ loop: true, breakpoints: {} }} className="w-full">
        <CarouselContent className="-ml-8">
          {medicosFiltrados.map((medico) => (
            <CarouselItem key={medico.id} className="basis-1/4 pl-8">
              <CardMedico props={medico} className="w-full"/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-primary" />
        <CarouselNext className="text-primary" />
      </Carousel>
    </div>
  );
};

export default BuscaCategoria;
