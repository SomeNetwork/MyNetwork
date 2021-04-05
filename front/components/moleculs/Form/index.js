import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.scss";
import { Button, Input, Text } from "components/atoms";
import { InputPropTypes } from "components/atoms/Input";
import { ButtonPropTypes } from "components/atoms/Button";
// const requiredFieldRule = (v) => !!v || "Required field.";

const Form = (props) => {
  const { title, fields, submitButton } = props;
  const [state, setState] = useState(
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        {
          value: field.defaultValue || "",
          error: false,
        },
      ])
    )
  );
  const rules = Object.fromEntries(
    fields.map((field) => {
      return [field.name, field.rules];
    })
  );
  const submit = (event) => {
    const { onSubmit } = props;
    const valid = formValidation();
    if (valid)
      onSubmit(
        Object.fromEntries(
          Object.entries(state).map(([name, { value }]) => [name, value])
        )
      );
    else console.log("not valid");
    event.preventDefault();
  };

  const fieldValidation = (value, rules) => {
    //return true(vlaid)  string(error)
    for (let rule of rules) {
      const res = rule(value, state);
      if (res !== true) return res;
    }
    return true;
  };

  const formValidation = () => {
    let valid = true;
    const newState = Object.fromEntries(
      Object.entries(state).map(([name, { value }]) => {
        const res = fieldValidation(value, rules[name]);
        // let error = res === true ? false : res;
        let error = false;
        if (res !== true) {
          error = res;
          valid = false;
        }
        return [name, { value, error }];
      })
    );

    setState(newState);
    return valid;
  };
  // debugger;
  return (
    <div>
      {title && <Text variant="title">{title}</Text>}
      <form onSubmit={submit}>
        {fields.map((field, idx) => (
          <Input
            key={idx}
            name={field.name}
            value={state[field.name].value}
            error={state[field.name].error}
            label={field.label}
            type={field.type}
            variant={field.variant}
            onChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                [field.name]: { value, error: false },
              }))
            }
            htmlProps={field.htmlProps}
            required={field.required}
            fluid={field.fluid}
          />
        ))}
        <Button
          /* variant={submitButton.variant}  */ {...submitButton}
          onClick={submit}
        >
          {submitButton.text || "Submit"}
        </Button>
      </form>
    </div>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: InputPropTypes.name.isRequired,
      label: InputPropTypes.label.isRequired,
      defaultValue: InputPropTypes.defaultValue,
      type: InputPropTypes.type,
      variant: InputPropTypes.variant,
      rules: PropTypes.arrayOf(PropTypes.func),
      required: InputPropTypes.required,
      htmlProps: InputPropTypes.htmlProps,
      fluid: InputPropTypes.fluid,
    })
  ).isRequired,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitButton: PropTypes.shape({
    text: ButtonPropTypes.text,
    variant: ButtonPropTypes.variant,
    animated: ButtonPropTypes.animated,
  }),
  // customProp: function (props, propName, componentName) {
  //   if (!/matchme/.test(props[propName])) {
  //     return new Error(
  //       "Проп `" +
  //         propName +
  //         "` компонента" +
  //         " `" +
  //         componentName +
  //         "` имеет неправильное значение"
  //     );
  //   }
  // },
};

export default Form;
