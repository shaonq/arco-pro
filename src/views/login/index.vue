<template>
  <div class="container" :style="{ background: `url(${LoginBgSunflower})` }">
    <div class="logo">
      <img alt="logo" :src="LogoWhite" width="200" draggable="false" />
    </div>
    <div class="content">
      <div class="content-inner" style="background: #fff">
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

  import LoginBgSunflower from '../../assets/images/login-bg-sunflower.jpg';
  import LogoWhite from '../../assets/logo-white.png';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .content-inner {
      width: 400px;
      display: flex;
      justify-content: center;
      padding-top: 44px;
      background: #fff;
      min-height: 460px;
      border-radius: 2px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
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
