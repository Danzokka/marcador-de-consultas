"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Schedule } from "@/app/lib";
import { cancelSchedule } from "../profileActions";
import { navigate } from "@/app/actions";

const CancelButton = ({ schedule }: { schedule: Schedule }) => {
  const handleCancel = async () => {
    await cancelSchedule(schedule.id);
    await navigate("/profile");
  };

  return (
    <Button className="bg-red-700" onClick={handleCancel}>
      Cancelar consulta
    </Button>
  );
};

export default CancelButton;
