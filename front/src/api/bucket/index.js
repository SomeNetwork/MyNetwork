import Api from "src/api";

export function load(path) {
  return Api.req.get(path);
}
export function save(path, file) {
  return Api.req.put(path, { body: file });
}

const Bucket = {
  load,
  save,
};
export default Bucket;
