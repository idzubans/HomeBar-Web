import { useFormik } from "formik";
import { setCookie } from "cookies-next";
import { Drink, Party } from "~/model";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";

export interface ReturnModel {
  drinks: Drink[];
  guestId: string;
}

interface Props {
  partyModel: Party;
  partyJoined(model: ReturnModel): void;
}

interface FormModel {
  name: string;
}

function JoinPartyForm({ partyModel, partyJoined }: Props) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: async (model: FormModel) => {
      const requestBody = {
        guestName: model.name,
      };
      const response = await fetch(`/api/parties/join/${partyModel.id}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.status === 200) {
        const partyDetail = await response.json();
        const cookieOptions = { expires: new Date(partyModel.endDate) };
        setCookie("guestId", partyDetail.guestId, cookieOptions);
        setCookie("partyId", partyModel.id, cookieOptions);
        partyJoined({
          drinks: partyDetail.drinks,
          guestId: partyDetail.guestId,
        });
      }
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
