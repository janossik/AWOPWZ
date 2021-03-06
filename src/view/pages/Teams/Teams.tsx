import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import ErrorData from "components/molecules/ErrorData/ErrorData";
import Instruction from "components/molecules/Instruction/Instruction";
import Loading from "components/molecules/Loading/Loading";
import TeamCard from "components/organisms/TeamCard/TeamCard";
import TeamsForm from "components/organisms/TeamsForm/TeamsForm";
import MashTemplate from "components/templates/MashTemplate/MashTemplate";
import { useUser } from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { ITeam } from "types/types";
import { instructionCreateTeams } from "utils/instructions";
import { collectionReferenceTeams } from "utils/references";

const Teams = () => {
  const { dataUser } = useUser();
  const [teams, loading, error] = useCollection(collectionReferenceTeams);

  if (loading) {
    return <Loading />;
  }

  if (error || !dataUser) {
    return <ErrorData />;
  }

  return (
    <>
      {dataUser?.isAdmin && (
        <AdditionBar right>
          <TeamsForm />
        </AdditionBar>
      )}
      <MashTemplate>
        <>
          {teams?.docs?.length ? (
            teams.docs.map((doc) => {
              const findTeam = dataUser.permissions.find((userTeam) => userTeam.id === doc.id);
              if (!findTeam && !dataUser.isAdmin) return null;
              const { members, name } = doc.data() as ITeam;
              return <TeamCard key={doc.id} teamId={doc.id} members={members} name={name} />;
            })
          ) : (
            <Instruction {...instructionCreateTeams} />
          )}
        </>
      </MashTemplate>
    </>
  );
};

export default Teams;
