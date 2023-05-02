import { useFormik } from "formik";
import router from "next/router";
import { api } from "~/utils/api";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

interface FormModel {
  pin: string;
}

function FindParty() {
  const { mutate } = api.parties.findParty.useMutation({
    onSuccess: (data) => {
      if (data) {
        formik.setStatus({ success: true });
        router.push(`/party/${data.id}`);
      } else {
        formik.setStatus({ success: false });
        formik.setSubmitting(false);
        formik.setErrors({ pin: "Party not found" });
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: async (model: FormModel) => {
      mutate({ pin: model.pin });
    },
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
      <Input
        label="PIN"
        placeHolder="Enter your party code"
        id="pin"
        name="pin"
        type="pin"
        onChange={formik.handleChange}
        value={formik.values.pin}
      />

      <Button isPrimary type="submit">
        Find
      </Button>
    </form>
  );
}
export default FindParty;
