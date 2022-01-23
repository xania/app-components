export async function uploadFiles(files: ArrayLike<File>, dir?: string) {
  var formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    formData.set(file.name, file, dir ? dir + "/" + file.name : file.name);
  }
  const url = "/api/CreateComponentTrigger";
  return await fetch(url, {
    body: formData,
    method: "POST",
  });
}
