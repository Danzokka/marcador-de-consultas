import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import Consultas from "./components/Consultas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "../actions";
import { redirect } from "next/navigation";
import { getUserSchedules } from "./profileActions";
import { Schedule } from "../lib";

const Profile = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/auth/login");
  }

  const userSchedules = await getUserSchedules(session.user?.id);

  const Card = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          "w-full h-full bg-slate-100 shadow-lg rounded-xl p-4 flex flex-col gap-4",
          className
        )}
      >
        {children}
      </div>
    );
  };

  function consultasMarcadas(schedules: Schedule[]) {
    return schedules.length;
  }

  function consultasRealizadas(schedules: Schedule[]) {
    const today = new Date();

    return schedules.filter((schedule) => {
      // Converte a data dd/mm/aaaa para um objeto Date
      const [day, month, year] = schedule.day.split("/").map(Number);
      const scheduleDate = new Date(year, month - 1, day); // month é 0-indexed em JS

      // Retorna true se a data da consulta já passou (é anterior à data atual)
      return scheduleDate < today;
    }).length;
  }

  const consultasFuturas: Schedule[] = userSchedules.filter(
    (schedule: Schedule) => {
      const today = new Date();
      const [day, month, year] = schedule.day.split("/").map(Number);
      const scheduleDate = new Date(year, month - 1, day); // month é 0-indexed em JS

      return scheduleDate >= today;
    }
  );

  return (
    <div className="w-full h-full min-h-screen py-8 px-4">
      <div className="w-full h-full shadow-lg bg-gray-100 flex flex-col py-6 px-4 rounded-xl gap-4">
        <div className="w-full flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={`https://avatar.vercel.sh/${session.user?.name}`}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-xl">
              Olá <span className="font-bold">{session.user?.name}</span>
            </h1>
            <p className="text-gray-500">Seja bem vindo ao seu perfil</p>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <Card className="w-2/5">
            <h2 className="text-xl font-semibold">Seus dados</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold mb-2">Dados pessoais</h2>
                <p>Nome: {session.user?.name}</p>
                <p>Email: {session.user?.email}</p>
                <p>Telefone: {session.user?.phone}</p>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold mb-2">Estatísticas</h2>
                <p>Marcou {consultasMarcadas(userSchedules)} consultas</p>
                <p>Realizou {consultasRealizadas(userSchedules)} consultas</p>
              </div>
            </div>
            <Button>Editar dados</Button>
          </Card>
          <Card className="w-3/5">
            <h2 className="text-xl font-semibold">Suas consultas</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {consultasFuturas.length === 0 ? (
                <p>Você ainda não tem nenhuma consulta marcada</p>
              ) : (
                consultasFuturas.map((schedule: Schedule) => (
                  <Consultas key={schedule.id} schedule={schedule} />
                ))
              )}
              {/* Additional Consultas components can be added and will automatically flow downward */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
