import { useFormik } from "formik";
import { setCookie } from "cookies-next";
import { Party } from "~/model";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { api } from "~/utils/api";

interface Props {
  partyModel: Party;
  partyJoined(): void;
}

interface FormModel {
  name: string;
}

function JoinPartyForm({ partyModel, partyJoined }: Props) {
  const { mutate } = api.parties.join.useMutation({
    onSuccess: (data) => {
      if (data) {
        const cookieOptions = { expires: new Date(partyModel.endDate) };
        setCookie("guestId", data, cookieOptions);
        setCookie("partyId", partyModel.id, cookieOptions);
        partyJoined();
      } else {
        formik.setStatus({ success: false });
        formik.setSubmitting(false);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: (model: FormModel) => {
      mutate({ guestName: model.name, partyId: partyModel.id});
    },
  });

  return (
    <form className="flex flex-col items-center justify-center gap-4 h-screen bg-gradient-to-br from-indigo-100" onSubmit={formik.handleSubmit}>
      <Input
        label="Name"
        placeHolder="Pick your party name"
        id="name"
        name="name"
        type="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <Button isPrimary type="submit">
        Join
      </Button>
    </form>
  );
}

export default JoinPartyForm;
