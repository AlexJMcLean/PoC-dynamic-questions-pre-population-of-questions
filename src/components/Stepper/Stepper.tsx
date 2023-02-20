import "./Stepper.css";

interface Props {
  numberOfPages: number;
  activeStepIndex: number;
}

function Stepper({ numberOfPages, activeStepIndex }: Props) {
  return (
    <div className="stepper-container">
      {Array.from({ length: numberOfPages }, (_, i) => {
        const stepNumber = i + 1;
        const isActiveStepOrHasCompletedPreviousQuestions =
          activeStepIndex >= stepNumber;
        return (
          <div
            key={`stepper-${stepNumber}`}
            className={`stepper-item ${
              isActiveStepOrHasCompletedPreviousQuestions && "stepper-active"
            }`}
          >
            {stepNumber}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
