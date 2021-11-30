import { useToast } from "hooks/useToast";
import { SubmitHandler } from "react-hook-form";
import AuthService from "data/AuthService";
import Form from "components/organisms/Form/Form";
import StoreService from "data/StoreService";
import { CollectionsName } from "utils/utils";

const { createDoc, collection } = StoreService;

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  profession: string;
};

const Fields = [
  { name: "email", type: "email", label: "Twój email" },
  { name: "password", type: "password", label: "Twoje hasło", options: { required: true, minLength: 8 } },
  { name: "repeatPassword", type: "password", label: "Powtórz swoje hasło", options: { required: true, minLength: 8 } },
  { name: "firstName", type: "text", label: "Podaj swoje imię" },
  { name: "lastName", type: "text", label: "Podaj swoje Nazwisko" },
  { name: "profession", type: "text", label: "Podaj swój zawód/stanowisko" },
];

const RegisterForm = () => {
  const { setToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.repeatPassword) {
      setToast("Wpisane hasła muszą być takie same ;c");
      return;
    }
    try {
      const { uid } = await AuthService.createUser(data.email, data.password);
      createDoc(
        {
          uid: uid,
          verifiedByAdmin: false,
          isAdmin: false,
          firstName: data.firstName,
          lastName: data.lastName,
          profession: data.profession,
        },
        await collection(CollectionsName.USERS, uid)
      );
      setToast(`Założyłeś nowe konto :D`);
    } catch (e: any) {
      setToast(e.message, "warning");
    }
  };

  return <Form fields={Fields} onSubmit={onSubmit} />;
};

export default RegisterForm;
