const imageUploadBox = document.getElementsByClassName("img-inp")[0];
const imgInput = imageUploadBox.getElementsByTagName("input")[0],
  priview = imageUploadBox.querySelector("img");

const widthInp = document.querySelector("#width"),
  heightInp = document.querySelector("#height");

const LockAspectRatio = document.querySelector("#aspect"),
  quality = document.querySelector("#shrink");

const downloadButt = document.querySelector(".download button");
let originalImgRatio = 0;
const loadfile = (e) => {
  const image = e.target.files[0];
  if (!image) {
    return;
  }
  priview.src = URL.createObjectURL(image);
  priview.addEventListener("load", () => {
    imageUploadBox.querySelector("p").classList.add("d-none");
    priview.classList.add("priview");
    imageUploadBox.classList.add("border-solid");
    widthInp.value = priview.naturalWidth;
    heightInp.value = priview.naturalHeight;
    originalImgRatio = widthInp.value / heightInp.value;

    console.log(originalImgRatio);
  });
};
widthInp.addEventListener("keyup", (e) => {
  priview.width = e.target.value;
  const heightW = LockAspectRatio.checked
    ? widthInp.value * originalImgRatio
    : heightInp.value;
  heightInp.value = Math.floor(heightW);
});
heightInp.addEventListener("keyup", (e) => {
  heightInp.value = e.target.value;
  const widthH = LockAspectRatio.checked
    ? heightInp.value * originalImgRatio
    : widthInp.value;
  widthInp.value = Math.floor(widthH);
});

downloadButt.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgQuality = quality.checked ? 0.7 : 1.0;
  canvas.width = widthInp.value;
  canvas.height = heightInp.value;
  ctx.drawImage(priview, 0, 0, canvas.width, canvas.height);

  let a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
});
imgInput.addEventListener("change", loadfile);
imageUploadBox.addEventListener("click", () => imgInput.click());
