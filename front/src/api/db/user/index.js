import API from "src/api";

export async function read(data) {
  const { username } = data;
  return API.req(`/users/${username}`).then((data) => {
    console.log("data :>> ", data);
    if (data.success) {
      return data.data;
    }
  });
}

const User = { read };

export default User;
