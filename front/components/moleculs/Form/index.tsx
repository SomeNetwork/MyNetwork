import React, { useState } from "react";
import { Button, Input, Text } from "components/atoms";
import { InputProps } from "components/atoms/Input";
import { ButtonProps } from "components/atoms/Button";

export type FormSubmitType =
  | ButtonProps["onClick"]
  | ((oEvent?: React.FormEvent<HTMLFormElement>) => void);

export type FieldErrorType = string | true;

export interface FormStateType {
  [k: string]: {
    value: InputProps["value"];
    valid: FieldErrorType;
  };
}
export type RuleType = (
  v: InputProps["value"],
  state: FormStateType
) => FieldErrorType;

export interface FormFieldType extends Omit<InputProps, "onChange" | "value"> {
  rules: RuleType[];
  defaultValue?: InputProps["value"];
}

export interface FormProps {
  fields: FormFieldType[];
  onSubmit: (data: { [key: string]: InputProps["value"] }) => void;
  title?: string;
  submitButton: ButtonProps;
}

const Form = (props: FormProps) => {
  // debugger;
  const { title, fields, submitButton } = props;
  const [state, setState] = useState<FormStateType>(
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        {
          value: field.defaultValue || "",
          valid: true,
        },
      ])
    )
  );
  const rules = Object.fromEntries(
    fields.map((field: FormFieldType) => [field.name, field.rules])
  );
  const submit: FormSubmitType = (oEvent) => {
    const { onSubmit } = props;
    const valid = formValidation();
    if (valid)
      onSubmit(
        Object.fromEntries(
          Object.entries(state).map(([name, { value }]) => [name, value])
        )
      );
    else console.log("not valid");
    oEvent?.preventDefault();
  };

  const fieldValidation = (
    value: InputProps["value"],
    rules: RuleType[]
  ): FieldErrorType => {
    for (const rule of rules) {
      const res = rule(value, state);
      if (res !== true) return res;
    }
    return true;
  };

  const formValidation = (): boolean => {
    let formValid = true;
    const newState: FormStateType = Object.fromEntries(
      Object.entries(state).map(([name, { value }]) => {
        const res = fieldValidation(value, rules[name]);
        let valid: FieldErrorType = true;
        if (res !== true) {
          valid = res;
          formValid = false;
        }
        return [name, { value, valid }];
      })
    );

    setState(newState);
    return formValid;
  };
  return (
    <div>
      {title && <Text variant="title">{title}</Text>}
      <form onSubmit={submit}>
        {fields.map((field, idx) => {
          // debugger;
          const error =
            typeof state[field.name].valid === "string"
              ? state[field.name].valid.toString()
              : false;
          return (
            <Input
              key={idx}
              name={field.name}
              value={state[field.name].value}
              error={error}
              label={field.label}
              type={field.type}
              variant={field.variant}
              onChange={(value) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    [field.name]: { value, valid: true },
                  };
                })
              }
              htmlProps={field.htmlProps}
              required={field.required}
              fluid={field.fluid}
            />
          );
        })}
        <Button {...submitButton} onClick={submit}>
          {submitButton.text || "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
