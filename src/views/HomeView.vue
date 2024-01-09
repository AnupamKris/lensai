<template>
  <div class="home">
    <div id="cameraPreview"></div>
    <img ref="inputFile" src="" height="300" />
    <div class="buttons">
      <button @click="startCamera">StartCam-</button>
      <button @click="stopCamera">StopCam</button>
      <button @click="clickPicture">click</button>
    </div>
    <textarea name="" id="" cols="30" rows="10" ref="result"></textarea>
  </div>
</template>

<script setup>
import { CameraPreview } from "@capacitor-community/camera-preview";
import { ref } from "vue";
import { run } from "../gemini";

const inputFile = ref(null);
const result = ref(null);

const startCamera = () => {
  CameraPreview.start({
    parent: "cameraPreview",
    position: "rear",
    className: "cameraPreview",
  });
};

const stopCamera = () => {
  CameraPreview.stop();
};

const clickPicture = () => {
  CameraPreview.capture({ quality: 90 }).then(async (picture) => {
    // picture is a base64 encoded string
    // {inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },};
    stopCamera();
    let base64String = picture.value;

    // put img in src
    inputFile.value.src = "data:image/jpeg;base64," + base64String;
    console.log("base64String", base64String);

    let mimeType = "image/jpeg";
    let file = {
      inlineData: {
        data: base64String,
        mimeType: mimeType,
      },
    };

    const res = await run(file);
    console.log("res", res);
    result.value.value = res;
  });
};
</script>

<style lang="scss" scoped>
.buttons {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  background: #ffffff55;
}
</style>
