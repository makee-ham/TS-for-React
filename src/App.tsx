import "./App.css";
import { Person } from "./Person";

function App() {
  return (
    <>
      <Person name={"Pedro"} age={34} isMarried={false} />
      <Person name={"Colin"} age={32} isMarried={true} />
    </>
  );
}

export default App;
