<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="handleUpdateUser">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="loginout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateUser } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: "Settings",
  async asyncData ({
    query, store
  }) {
    const originalUser = store.state.user
    const user = {
      bio: originalUser.bio || '',
      email: originalUser.email || '',
      image: originalUser.image || '',
      username: originalUser.username || '',
      password: originalUser.password || '',
    }
    return {
      user
    }
  },
  methods: {
    /**更新用户信息 */
    async handleUpdateUser () {
      try {
        const data = await updateUser({
          user: this.user
        })
        const { data: { user } } = data
        if (user) {
          this.$router.push({
            name: 'profile',
            params: {
              username: user.username
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**登出 */
    loginout () {
      this.$store.commit("clearUser");
      this.$router.push({
        name: 'login'
      })
    }
  }
};
</script>

<style>
</style>