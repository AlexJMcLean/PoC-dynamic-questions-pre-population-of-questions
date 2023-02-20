import {
  FormConfig,
  FormFieldConfig,
  FormFieldSelectOption,
} from "./interfaces";
import { values } from "./pre-filled-values";
import * as Yup from "yup";
import { Formik, FormikProps, Form, Field } from "formik";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface GenericFormProps {
  config: FormConfig;
  activeStepIndex: number;
  setActiveStepIndex: Dispatch<SetStateAction<number>>;
}

const GenericForm = ({
  config,
  activeStepIndex,
  setActiveStepIndex,
}: GenericFormProps) => {
  const activePage = config.fields[activeStepIndex].formFields;
  const numberOfPages = config.fields.length - 1; // normalise it to compare with ActiveStepIndex
  const isLastStep = numberOfPages === activeStepIndex;

  const preFilledValues: any = values;

  const FormValidationSchema = Yup.lazy((obj) =>
    Yup.object(
      Object.keys(obj).reduce((prev, key) => {
        const field = activePage.find((f) => f.name === key);
        let rule = Yup.string();
        if (field) {
          if (field.validate === "email") {
            rule = rule.email("A valid email is required");
          }
          if (field.maxLength) {
            rule = rule.max(field.maxLength);
          }
          if (field.required) {
            rule = rule.required("This field is required");
          }
        }
        if (rule) return { ...prev, [key]: rule };
        else return prev;
      }, {})
    )
  );

  const initVals: any = {};
  activePage.forEach((field: FormFieldConfig) => {
    initVals[field.name] = preFilledValues[field.name] ?? field.value ?? "";
  });

  return (
    <div>
      {config.title && <h3>{config.title}</h3>}

      <Formik
        initialValues={initVals}
        validationSchema={FormValidationSchema}
        onSubmit={async (values) => {
          if (isLastStep) {
            fetch(config.action, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((response) => alert(response));
          } else {
            setActiveStepIndex(activeStepIndex + 1);
          }
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            {activePage.map((field: FormFieldConfig) => {
              const { name, label, placeholder, input, options, value } = field;
              const key = `${config.name}-${name}`;

              switch (input) {
                case "textarea":
                  return (
                    <div key={key}>
                      <label htmlFor={name}>{label}</label>
                      <Field
                        id={name}
                        name={name}
                        as="textarea"
                        placeholder={placeholder ?? ""}
                      />
                      {props.errors[name] && props.touched[name] ? (
                        <div className="field-error">
                          {props.errors[name] as ReactNode}
                        </div>
                      ) : null}
                    </div>
                  );
                case "select":
                  if (options) {
                    return (
                      <div key={key}>
                        <label htmlFor={name}>{label}</label>
                        <Field id={name} name={name} as="select">
                          {options.map((option: FormFieldSelectOption) => (
                            <option
                              key={`${config.name}-${option.value}`}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        {props.errors[name] && props.touched[name] ? (
                          <div>{props.errors[name] as ReactNode}</div>
                        ) : null}
                      </div>
                    );
                  } else {
                    return null;
                  }
                case "checkbox":
                  return (
                    <div key={key}>
                      <label htmlFor={name}>{label}</label>
                      <Field
                        id={name}
                        name={name}
                        type="checkbox"
                        value={value}
                      />
                      {props.errors[name] && props.touched[name] ? (
                        <div>{props.errors[name] as ReactNode}</div>
                      ) : null}
                    </div>
                  );
                case "email":
                  return (
                    <div key={key}>
                      <label htmlFor={name}>{label}</label>
                      <Field
                        id={name}
                        name={name}
                        type="email"
                        placeholder={placeholder ?? ""}
                      />
                      {props.errors[name] && props.touched[name] ? (
                        <div>{props.errors[name] as ReactNode}</div>
                      ) : null}
                    </div>
                  );
                default:
                  return (
                    <div key={key}>
                      <label htmlFor={name}>{label}</label>
                      <Field
                        id={name}
                        name={name}
                        placeholder={placeholder ?? ""}
                      />
                      {props.errors[name] && props.touched[name] ? (
                        <div>{props.errors[name] as ReactNode}</div>
                      ) : null}
                    </div>
                  );
              }
            })}
            <button
              type="submit"
              disabled={Object.keys(props.errors).length ? true : false}
            >
              {isLastStep ? config.submit ?? "Submit" : "Next"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenericForm;
