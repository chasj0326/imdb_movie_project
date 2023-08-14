<template>
  <div class="loader-container">
    <div class="loader">
      <div class="loader__filmstrip"></div>
      <p class="loader__text">loading</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Anton');
$color-primary: #2e2e2e;
$color-secondary: #ffffff;
$font: Anton, sans-serif;
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
}
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__text {
    margin: 5px auto;
    color: $color-primary;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: $font;
  }
  &__filmstrip {
    position: relative;
    width: 40px;
    height: 50px;
    background: $color-primary;
    overflow: hidden;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 120%;
      border-left: 5px dashed $color-secondary;
      animation: roll 0.2s infinite;
    }
    &:before {
      left: 5px;
    }
    &:after {
      right: 5px;
    }
  }
}

@keyframes roll {
  0% {
    top: 0px;
  }
  100% {
    top: -15px;
  }
}
</style>
