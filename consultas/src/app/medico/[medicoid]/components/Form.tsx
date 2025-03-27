"use client";
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Doctor, Schedule } from "@/app/lib";
import { bookSchedule } from "../actions";
import { redirect } from "next/navigation";
import { navigate } from "@/app/actions";

interface ScheduleFormProps {
  props: {
    medic: Doctor;
    schedules: Schedule[];
  };
}

const formSchema = z.object({
  day: z.string({
    required_error: "O dia é obrigatório",
  }),
  hour: z.string({
    required_error: "O horário é obrigatório",
  }),
});

const ScheduleForm = ({ props }: ScheduleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Estado para acompanhar o dia selecionado
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Extrair dias únicos para o seletor de dias
  const uniqueDays = useMemo(() => {
    const days = new Set<string>();
    props.schedules.forEach((schedule) => {
      if (!schedule.userId) {
        // Apenas horários não agendados
        days.add(schedule.day);
      }
    });
    return Array.from(days);
  }, [props.schedules]);

  // Filtrar horários disponíveis para o dia selecionado
  const availableHours = useMemo(() => {
    if (!selectedDate) return [];

    return props.schedules
      .filter((schedule) => schedule.day === selectedDate && !schedule.userId)
      .map((schedule) => schedule.hour)
      .sort(); // Ordena os horários
  }, [selectedDate, props.schedules]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const selectedSchedule = props.schedules.find(
      (schedule) => schedule.day === data.day && schedule.hour === data.hour
    );

    if (!selectedSchedule) {
      console.error("Horário não encontrado");
      return;
    }

    // Implementar a lógica de agendamento
    const shcedule: Schedule = await bookSchedule(selectedSchedule.id);
    if (shcedule) {
      alert("Consulta agendada com sucesso");
    } else {
      alert("Erro ao agendar consulta");
    }

    await navigate("/profile")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full items-center justify-center py-8 px-4 rounded-lg"
        >
          <h2 className="w-full text-2xl font-bold text-left">
            Marque a sua consulta com <br />{" "}
            <span className="text-primary">{props.medic.name}</span>
          </h2>
          <h3 className="text-left w-full text-gray-700">
            Selecione o dia e horário da sua consulta
          </h3>
          <div className="w-full flex gap-4 justify-between">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Dia</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedDate(value);
                        // Reset o campo de horário quando um novo dia é selecionado
                        form.setValue("hour", "");
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Dias</SelectLabel>
                          {uniqueDays.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Horário</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      disabled={!selectedDate || availableHours.length === 0}
                      onValueChange={field.onChange} // Adicione esta linha
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            !selectedDate
                              ? "Selecione um dia primeiro"
                              : availableHours.length === 0
                              ? "Sem horários disponíveis"
                              : "Selecione o horário"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Horários</SelectLabel>
                          {availableHours.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Agendar consulta</Button>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleForm;
