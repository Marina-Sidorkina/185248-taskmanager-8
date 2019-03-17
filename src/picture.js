const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const checkFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((ending) => fileName.endsWith(ending));
};

const loadAvatarPreview = (file, picturePreview) => {
  if (checkFileType(file)) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      picturePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

export const onChange = function (pictureInput, picturePreview) {
  const file = pictureInput.files[0];
  if (file) {
    loadAvatarPreview(file, picturePreview);
  }
};
