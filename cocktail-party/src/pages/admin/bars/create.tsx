import { useSession } from "next-auth/react";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";
import { FormikHelpers, useFormik } from "formik";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface FormModel {
  name: string;
  endDate: string;
}

function Bars() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { mutate, isSuccess } = api.bars.create.useMutation();

  isSuccess && router.push("/admin/bars");

  const formik = useFormik({
    initialValues: {
      name: "",
      endDate: dayjs().add(1, "day").toISOString(),
    },

    onSubmit: async (
      model: FormModel,
      { setSubmitting, setStatus, setErrors }: FormikHelpers<FormModel>
    ) => {
      const requestBody = {
        name: model.name,
        userId: session?.user.id
      };

      mutate(requestBody);
    },
  });

  return (
    <form className="m-8 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div>
        <Input
          id="name"
          name="name"
          label="Name*"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeHolder={"Name of the bar"}
        />
      </div>
      <div className="flex gap-4">
        <Button isPrimary type="submit">
          Submit bar
        </Button>
        <Button isPrimary={false} type="reset">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default Bars;
