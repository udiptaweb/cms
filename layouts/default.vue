<template>
  <div class="public-layout">
    <section>
      <NotificationBar class="is-desktop"></NotificationBar>
    </section>
    <section >
      <NavigationBar></NavigationBar>
    </section>
    <section>
      <nuxt/>
    </section>
    <section class="">
      <div class="" style="width: 100%;">
        <footer class="footer" style="height: 36px;">
          <div class="content has-text-centered">
            <p>&copy; Copyright 2019</p>
            <p>
              <strong>Future Education</strong> by <a href="https://algorizon.com"><span style="color: red;" class="has-text-weight-semibold">Algorizon Technologies</span></a>. The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
              is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
            </p>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>
<script>
import NavigationBar from '~/components/public/NavigationBar.vue'
import NotificationBar from '~/components/public/NotificationBar.vue'
  export default{
    components:{
      NavigationBar,
      NotificationBar
    }
  }
</script>
<style scoped>
.public-layout{
  font-family:Poppins,sans-serif;
}
  @media(max-width: 990px){
    .is-desktop{
      display: none;
    }
  }
html {
 font-family:Poppins,sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.hero-body{
  background-image: url('~assets/hero1.png');background-repeat:no-repeat;background-size:100% 100%;
}
.footer{
  background-color:#EAF0F7;
  color: #50649C;
  text-align: center;
  font-size: 12px;
}
</style>
