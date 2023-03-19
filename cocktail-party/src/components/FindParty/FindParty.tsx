import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

interface FormModel {
  pin: string;
}

function FindParty() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: async (
      model: FormModel,
      { setSubmitting, setStatus, setErrors }: FormikHelpers<FormModel>
    ) => {
      const response = await fetch(`api/parties/find/${model.pin}`);
      if (response.status !== 200) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ pin: "Party not found" });
        return;
      }

      if (response.status === 200) {
        const {partyDetail} = await response.json();
        setStatus({ success: true });
        router.push(`/party/${partyDetail.id}`)
      }
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
