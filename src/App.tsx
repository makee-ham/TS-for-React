import "./App.css";
import { User, Countries } from "./User";
import { UserProvider } from "./UserContextProvider";

function App() {
  return (
    <UserProvider>
      <User
        name={"Pedro"}
        age={34}
        isMarried={false}
        country={Countries.Brazil}
      />
      <User
        name={"Colin"}
        age={32}
        isMarried={true}
        country={Countries.India}
      />
    </UserProvider>
  );
}

export default App;
