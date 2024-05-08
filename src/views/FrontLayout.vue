<template>
  <div class="container" style="text-align: center;">
    <div class="row pt-3">
      <div class="col"></div>
      <div class="col-4">
        <div class="Register-background">
          <img class="img" src="/src/imgs/sports.png">
          <p style="position: relative; top: 75px; left: 70px; color: white; font-weight: bold; font-size: 30px;">Come on~<br>來運動吧！</p>
        </div>
      </div>
      <div class="col-3 my-auto" style="text-align: center;">
        <v-form id="form" ref="form" v-slot="{ errors }" @submit="submitOrder">
          <h1 class="mb-4 text-center">會員註冊系統</h1>
          <v-field
            type="text"
            name="會員姓名"
            placeholder="請輸入姓名"
            class="mb-4 px-3 pe-4 py-2"
            v-model="name"
            rules="required"
          />
          <error-message name="會員姓名" class="invalid-feedback"></error-message>
          <v-field
            type="text"
            name="會員帳號"
            placeholder="請輸入會員帳號"
            class="mb-3 px-3 pe-4 py-2"
            v-model="username"
            :class="{ 'is-invalid': errors['會員帳號'] }"
            rules="required"
          />
          <error-message name="會員帳號" class="invalid-feedback"></error-message>
          <v-field
            type="password"
            placeholder="請輸入密碼"
            name="密碼"
            class="mb-4 px-3 pe-4 py-2"
            :rules="isPassword"
            v-model="password"
            :class="{ 'is-invalid': errors.密碼 }"
          />
          <error-message name="密碼" class="invalid-feedback"></error-message>
          <v-field
            type="email"
            name="email"
            placeholder="請輸入電子郵件"
            class="mb-3 px-3 pe-4 py-2"
            v-model="email"
            rules="required|email"
            :class="{ 'is-invalid': errors.email }"
          />
          <error-message name="email" class="invalid-feedback"></error-message>
          <v-field
            type="tel"
            name="手機號碼"
            placeholder="請輸入手機號碼"
            class="mb-4 px-3 pe-4 py-2"
            rules="required"
            v-model="phone"
          />
          <error-message name="手機號碼" class="invalid-feedback"></error-message>
          <v-field
            type="text"
            name="地址"
            placeholder="請輸入地址"
            class="mb-4 px-3 pe-4 py-2"
            rules="required"
            v-model="address"
          />
          <error-message name="地址" class="invalid-feedback"></error-message>
          <button
            class="btn btn-lg btn-primary w-100"
            type="submit"
          >
            註冊
          </button>
        </v-form>
        <div class="text-end login-buttom">
          <RouterLink to="/login">已是會員，請按此登入</RouterLink>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    // 自訂驗證規則-密碼需含大小寫英文字母
    isPassword(value) {
      const passwordNumber = /^(?=.*[a-z])(?=.*[A-Z])/;
      return passwordNumber.test(value) ? true : "密碼 需含大小寫英文字母";
    },
    // 表單送出按鈕
    submitOrder() {
      // 使用 Vee Validate 的 validate 函式來驗證表單
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          // 驗證通過，可以提交表單
          axios
            .post("http://localhost:3000/user", {
              name: this.name,
              username: this.username,
              password: this.password,
              email: this.email,
              phone: this.phone,
              address: this.address,
            })
            .then((res) => {
              console.log(res);
              alert("註冊成功");
              // 網路請求成功後清空表單欄位(初始化)
              this.$refs.form.resetForm();
            })
            .catch((error) => {
              console.log(error);
              alert("註冊失敗");
            });
        } else {
          // 驗證不通過不予提交並顯示錯誤訊息
          alert("請確實填寫資料後提交");
        }
      });
    },
  },
}
</script>

<style>
.Register-background {
  background-color: #FDAA2D;
  width: 100%;
  height: 100%;
}
.img {
  position: relative;
  top: 180px;
  left: -80px;
  width: 120px;
  height: 120px;
}
</style>