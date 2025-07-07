import "./App.css";
import { User } from "./User";
import { UserProvider } from "./UserContextProvider";

function App() {
  return (
    <UserProvider>
      <User name={"Pedro"} age={34} isMarried={false} />
      <User name={"Colin"} age={32} isMarried={true} />
    </UserProvider>
  );
}

export default App;
