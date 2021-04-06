import API from "src/api";

export function read(data) {
  const { username } = data;
  return API.req(`/users/${username}`).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}
export function update(oldData, newData) {
  const { username } = oldData;
  return API.req.post(`/users/update/${username}`, newData).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}

const User = { read, update };

export default User;
