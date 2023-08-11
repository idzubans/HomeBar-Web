'use client';

import { api } from "~/utils/api";
import { Button } from "../shared/Button";
import { Input } from "~/components/ui/input"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import router from "next/router";
import { Bar } from "~/model";

const formSchema = z.object({
  pin: z.string().length(8),
});

type FormSchemaType = z.infer<typeof formSchema>;

function FindBarForm() {
  const { mutate } = api.bars.findByPin.useMutation({
    onSuccess: (data: Bar | null) => {
      if (data) {
        router.push(`/bar/${data.id}`);
      } else {
        setError("root", {
          type: "manual",
          message: "Bar not found",
        });
      }
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    mutate(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) });

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      
      <Input
        {...register("pin")}
      />
      {errors.pin && <p>PIN: {errors.pin.message}</p>}
      {errors.root && <p>ROOT: {errors.root.message} </p>}

      <Button isPrimary type="submit">
        Find
      </Button>
    </form>
  );
}
export default FindBarForm;
