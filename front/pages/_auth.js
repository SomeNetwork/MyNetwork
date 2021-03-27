import PropTypes from "prop-types";
import { Form, Card } from "components/atoms";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "store/auth/actions";

const Auth = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    dispatch(signIn(data));
  };

  const auth = useSelector((state) => state.auth);
  return (
    <>
      <p>username: {auth.username}</p>
      <p>_id: {auth._id}</p>
      <Card>
        <Form {...config} onSubmit={(res) => handleSubmit(res)} />
      </Card>
    </>
  );
};

Auth.propTypes = {};

export default Auth;
