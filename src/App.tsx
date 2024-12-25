import Circle1 from "./assets/decorations/circle-1.svg";
import Circle2 from "./assets/decorations/circle-2.svg";
import Circle3 from "./assets/decorations/circle-3.svg";
import Circle4 from "./assets/decorations/circle-4.svg";
import { Card } from "./components/Card/Card.tsx";
import TaskManager from "./components/TaskManager/TaskManager.tsx";
import "./App.css";

function App() {
  return (
    <>
      <div className="background">
        <img className="decoration-image-1" src={Circle1} alt="" width={300} height={300}/>
        <img className="decoration-image-2" src={Circle2} alt="" width={300} height={300}/>
        <img className="decoration-image-3" src={Circle3} alt="" width={400} height={400}/>
        <img className="decoration-image-4" src={Circle4} alt="" width={300} height={300}/>
      </div>

      <div className="container">
        <Card asChild>
          <header className="header">
            <h1 className="app-title">To-Do App</h1>
          </header>
        </Card>

        <Card asChild>
          <main className="main">
            <TaskManager/>
          </main>
        </Card>
      </div>
    </>
  );
}

export default App;
