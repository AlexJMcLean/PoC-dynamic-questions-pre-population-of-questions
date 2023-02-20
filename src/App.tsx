import "./App.css";
import { FormConfig } from "./interfaces";
import { forms } from "./formData";
import GenericForm from "./GenericForm";
import Stepper from "./components/Stepper/Stepper";
import { useState } from "react";

function App() {
  const arrayOfForms: FormConfig[] = forms;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <div className="App">
      <Stepper numberOfPages={3} activeStepIndex={activeStepIndex} />
      {arrayOfForms.map((form: FormConfig) => {
        return (
          <GenericForm
            key={form.name}
            config={form}
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
          />
        );
      })}
    </div>
  );
}

export default App;
