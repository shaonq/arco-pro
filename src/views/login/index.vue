<template>
  <div class="container" :style="{ 'background-image': `url(${LoginBg})` }">
    <div class="logo">
      <LogoSvg />
    </div>
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import LoginForm from './components/login-form.vue';
  import LoginBg from '../../assets/assets-login-bg-sunflower.jpg';
  import LogoSvg from '../../assets/logo.svg';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
      overflow: hidden;
      &-inner {
        width: 400px;
        max-width: 100%;
        padding: 36px 24px 84px;
        background: #fff;
        min-height: 460px;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
      }
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
