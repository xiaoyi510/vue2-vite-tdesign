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
      canvasHeight: 0,

      // 二维码图片大小
      layerWidth: "100",
      layerHeight: "100",
      finalPosition: { x: 0, y: 0 },

      // 原始背景图片容器宽度高度
      originalBackgroundWidth: 0,
      originalBackgroundHeight: 0,
      // 当前背景图片容器宽度高度
      displayedBackgroundWidth: 0,
      displayedBackgroundHeight: 0,
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
      }
    },
    stopDragging() {
      this.dragging = false
      // 计算缩放比例
      const scaleX
        = this.originalBackgroundWidth / this.displayedBackgroundWidth
      const scaleY
        = this.originalBackgroundHeight / this.displayedBackgroundHeight

      console.log('当前位置', this.layerX * scaleX, this.layerY * scaleY)
      console.log('---------')
    },
    adjustCanvasHeight(event) {
      // 背景图片原始尺寸
      this.originalBackgroundWidth = event.target.naturalWidth
      this.originalBackgroundHeight = event.target.naturalHeight
      // 获取容器尺寸
      this.displayedBackgroundWidth = event.target.offsetWidth
      this.displayedBackgroundHeight = event.target.offsetHeight


      const backgroundImage = new Image()
      backgroundImage.src = this.backgroundImage
      backgroundImage.onload = () => {
        this.canvasHeight = 'auto'
      }
    },
  },
}
</script>

<template>
  <div style="width: 400px; min-height: 120px">
    <div class="canvas-container">
      <div class="canvas" :style="{ height: `auto` }">
        <img ref="backgroundImageRef" class="background-image" :src="backgroundImage" @load="adjustCanvasHeight">
        <img ref="layer" class="layer" :src="layerImage" :style="{
          transform: `scale(${scale})`,
          left: `${layerX}px`,
          top: `${layerY}px`,
        }" :width="`${layerWidth}px`" :height="`${layerHeight}px`" @mousedown="startDragging" @mousemove="drag"
          @mouseup="stopDragging">
      </div>
    </div>
    <div class="output">
      {{ finalPosition.x }}, {{ finalPosition.y }}
    </div>
    <t-input v-model="layerWidth" />

    <t-input v-model="layerHeight" />
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
