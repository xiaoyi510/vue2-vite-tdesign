<!-- @format -->

<script>
export default {
  data() {
    return {
      backgroundImage: '/src/assets/images/bg.jpg',
      layerImage: '/src/assets/images/qrcode.png',
      scale: 1,
      layerX: 0,
      layerY: 0,
      dragging: false,
      offsetX: 0,
      offsetY: 0,

      // 二维码图片大小
      layerWidth: "100",
      layerHeight: "100",
      qrcodeSize: [0, 0, 0, 0],// 原始宽度 高度 容器宽度高度
      finalPosition: { x: 0, y: 0 },

      scaleX: 0,
      scaleY: 0,


    }
  },
  methods: {
    startDragging(event) {
      this.dragging = true
      this.offsetX = event.clientX - this.layerX
      this.offsetY = event.clientY - this.layerY
    },
    drag(event) {
      if (this.dragging) {
        this.layerX = event.clientX - this.offsetX
        this.layerY = event.clientY - this.offsetY
        this.updatePosition();
      }
    },

    // 计算坐标
    updatePosition() {
      this.finalPosition.x = (this.layerX + (this.qrcodeSize[0] - this.qrcodeSize[2]) / 2) * this.scaleX
      this.finalPosition.y = (this.layerY + (this.qrcodeSize[1] - this.qrcodeSize[3]) / 2) * this.scaleY
    },
    stopDragging() {
      this.dragging = false
      this.updatePosition();
    },
    // 背景图片加载成功
    adjustCanvasHeight(event) {

      // 计算缩放比例 背景图片原始尺寸/当前尺寸
      this.scaleX
        = this.$refs.backgroundImageRef.naturalWidth / this.$refs.backgroundImageRef.offsetWidth
      this.scaleY
        = this.$refs.backgroundImageRef.naturalHeight / this.$refs.backgroundImageRef.offsetHeight



      // 获取缩放比例
      this.scale = this.$refs.backgroundImageRef.offsetWidth / this.$refs.backgroundImageRef.naturalWidth


      this.qrcodeSize[0] = this.$refs.layer.naturalWidth
      this.qrcodeSize[1] = this.$refs.layer.naturalHeight
      this.qrcodeSize[2] = this.qrcodeSize[0] * this.scale
      this.qrcodeSize[3] = this.qrcodeSize[1] * this.scale


    },
  },

}
</script>

<template>
  <div class="canvas-container">
    <div class="canvas" :style="{ height: `auto` }">
      <img ref="backgroundImageRef" class="background-image" :src="backgroundImage" @load="adjustCanvasHeight">
      <img ref="layer" class="layer" :src="layerImage" :style="{
        transform: `scale(${scale})`,
        left: `${layerX}px`,
        top: `${layerY}px`,
      }" @mousedown="startDragging" @mousemove="drag" @mouseup="stopDragging">
    </div>
  </div>
</template>

<style>
.canvas-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.canvas {
  position: relative;
  width: 100%;
}

.layer {
  position: absolute;
  cursor: move;
}



.layer,
.background-image {
  -webkit-user-drag: none;
  /* webkit浏览器 */
  -khtml-user-drag: none;
  /* khtml浏览器 */
  -moz-user-drag: none;
  /* mozilla浏览器 */
  -o-user-drag: none;
  /* opera浏览器 */
  user-drag: none;
  /* 通用语法 */
}
</style>
