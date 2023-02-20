export interface FormPages {
  page: number;
  formFields: FormFieldConfig[];
}

export interface FormConfig {
  name: string;
  selector: string;
  action: string;
  title?: string;
  fields: FormPages[];
  submit?: string;
}

export interface FormFieldConfig {
  name: string;
  label?: string;
  input?: string;
  maxLength?: number;
  validate?: string;
  value?: string | boolean;
  required?: boolean;
  placeholder?: string;
  classes?: string;
  options?: FormFieldSelectOption[];
}

export interface FormFieldSelectOption {
  value: string;
  label: string;
}
