import Api from "src/api";

export function load(path: string) {
  return Api.req.get(path);
}
export function save(path: string, file: File) {
  return Api.req.put(path, { body: file });
}

export async function localSave(file?: File | null): Promise<FileReader["result"]> {
  return new Promise<FileReader["result"]>((resolve, reject) => {
    if (file) {
      if (typeof window !== "undefined") {
        const fr = new (window.FileReader)();
        fr.onload = function () {
          resolve(fr.result);
        };
        fr.readAsDataURL(file);
      }
    } else reject(new Error("Empty file"));
    // return URL.createObjectURL(file);
    // }
  });
}

// export async function localSave(file) {
//   // return new Promise((resolve, reject) => {
//   if (file) {
//     //   var fr = new FileReader();
//     //   fr.onload = function () {
//     //     resolve(fr.result);
//     //   };
//     //   fr.readAsDataURL(file);
//     // } else reject(new Error("Empty file"));
//     return URL.createObjectURL(file);
//   }
//   // });
// }

const Bucket = {
  load,
  save,
  localSave,
};
export default Bucket;
