import { FormConfig } from "./interfaces";

export const forms: FormConfig[] = [
  {
    name: "contact",
    title: "Contact Us",
    selector: "contactform",
    action: "/ajax/contact",
    fields: [
      {
        page: 1,
        formFields: [
          {
            name: "firstname",
            label: "First Name",
            maxLength: 120,
            required: true,
          },
          {
            name: "surname",
            label: "Surname",
            maxLength: 120,
          },
          {
            name: "email",
            label: "Email",
            maxLength: 256,
            validate: "email",
            required: true,
          },
        ],
      },
      {
        page: 2,
        formFields: [
          {
            name: "type",
            label: "Enquiry Type",
            input: "select",
            options: [
              {
                label: "General Enquiry",
                value: "general",
              },
              {
                label: "Support Request",
                value: "support",
              },
              {
                label: "Complaint",
                value: "complaint",
              },
            ],
          },
          {
            name: "subscribe",
            label: "Subscribe to newsletters",
            input: "checkbox",
          },
        ],
      },
      {
        page: 3,
        formFields: [
          {
            name: "message",
            label: "Message",
            input: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
];
