import Form from "components/organisms/Form/Form";
import { ProjectService } from "data/ProjectService";
import { useToast } from "hooks/useToast";
import { SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
};

const Fields = [{ name: "name", type: "text", label: "Nazwa projektu" }];

const ProjectForm = ({ id }: { id?: string }) => {
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    try {
      if (id) {
        ProjectService.updateProjectName(name, id);
      } else {
        ProjectService.initNewProject(name);
      }
    } catch (error) {
      setToast("Coś poszło nie tak :c");
    }
  };

  return (
    <>
      <Form fields={Fields} onSubmit={onSubmit} />
    </>
  );
};

export default ProjectForm;
