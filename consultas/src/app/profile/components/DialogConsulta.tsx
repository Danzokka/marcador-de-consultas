import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Doctor, Schedule } from "@/app/lib";
import ScheduleForm from "@/app/medico/[medicoid]/components/Form";
import { getMedicoSchedules } from "@/app/medico/[medicoid]/actions";
import CancelButton from "./CancelButton";

interface DialogConsultaProps {
  doctor: Doctor | null;
  schedule: Schedule;
}

const DialogConsulta = async ({ doctor, schedule }: DialogConsultaProps) => {
  if (!doctor) return null;

  const schedules = await getMedicoSchedules(parseInt(doctor.id));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold">Ver detalhes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes sobre sua consulta</DialogTitle>
          <DialogDescription>
            Consulta com o doutor {doctor?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex flex-col gap-2">
            <p>Data: {schedule.day}</p>
            <p>Horário: {schedule.hour}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>
              Marcada no dia:{" "}
              {new Date(schedule.createdAt).toLocaleDateString("pt-br")}
            </p>
            <p>
              Ultima atualização:{" "}
              {new Date(schedule.updatedAt).toLocaleDateString("pt-br")}
            </p>
          </div>
        </div>
        <DialogFooter>
          <CancelButton schedule={schedule}/>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-semibold">Marcar consulta</Button>
            </DialogTrigger>
            <DialogContent>
              <ScheduleForm
                props={{
                  medic: doctor,
                  schedules: schedules,
                }}
              />
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConsulta;
