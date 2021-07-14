<template>
  <div class="contacts p_page">
    <div class="container">
      <div class="title_small">
        <h1>{{ $locale[$lang].contactsTitle }}</h1>
      </div>
      <div class="contacts_date" v-if="contactsData">
        <div class="row">
          <div class="col-xl-6">
            <div class="contacts_info">
              <p class="silver_text">
                {{ contactsData.contacts.description }}
              </p>
              <ul>
                <li>
                  <img src="@/assets/images/call_block.svg" alt="" />
                  <a :href="contactsData.contacts.whats_app">{{
                    contactsData.contacts.whats_app
                  }}</a>
                </li>
                <li>
                  <img src="@/assets/images/email_black.svg" alt="" />
                  <a :href="'mailto:' + contactsData.contacts.email">{{
                    contactsData.contacts.email
                  }}</a>
                </li>
                <li>
                  <img src="@/assets/images/loc_black.svg" alt="" />
                  <a href="#">{{ contactsData.contacts.address }}</a>
                </li>
              </ul>
              <div class="socials">
                <a
                  :href="
                    'https://api.whatsapp.com/send?phone=' +
                    contactsData.contacts.whats_app
                  "
                  target="blank"
                >
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a
                  href="https://instagram.com/collibri.beauty?igshid=rznyy0dd09oc"
                  target="blank"
                  ><i class="fab fa-instagram"></i
                ></a>
              </div>
              <div id="my-map" class="mt-5 w-100"></div>
            </div>
          </div>
          <div class="col-xl-5">
            <div class="contacts_form">
              <div class="title">
                <h2>{{ $locale[$lang].contactsUs }}</h2>
              </div>
              <p class="typo__p" v-if="submitStatus === 'OK'">
                Заявка отправлена
              </p>
              <form
                ref="form"
                action=""
                @submit.prevent="submit"
                :class="{ 'form-group--error': $v.name.$error }"
              >
                <input
                  type="text"
                  :placeholder="$locale[$lang].placeholders.name"
                  v-model.trim="name"
                  :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                />
                <span v-if="$v.name.$error" class="error">{{
                  $locale[$lang].placeholders.name
                }}</span>
                <the-mask
                  :mask="['+7(###) ###-##-##']"
                  :masked="true"
                  v-model.trim="phone"
                  :placeholder="$locale[$lang].placeholders.PhoneNumber"
                  :class="{
                    invalid:
                      ($v.phone.$dirty && !$v.phone.required) ||
                      ($v.phone.$dirty && !$v.phone.minLength),
                  }"
                />
                <span v-if="$v.phone.$error" class="error"
                  >{{ $locale[$lang].errors.PhoneNumber }}
                  {{ phone.length }}</span
                >
                <input
                  type="text"
                  :placeholder="$locale[$lang].placeholders.email"
                  v-model.trim="email"
                  :class="{
                    invalid:
                      ($v.email.$dirty && !$v.email.required) ||
                      ($v.email.$dirty && !$v.email.email),
                  }"
                />
                <span v-if="$v.email.$dirty && $v.email.$error" class="error">{{
                  $locale[$lang].errors.email
                }}</span>
                <input
                  type="text"
                  :placeholder="$locale[$lang].placeholders.nameOfCompany"
                  v-model="company"
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  :placeholder="$locale[$lang].placeholders.comment"
                ></textarea>
                <vue-recaptcha
                  @verify="markRecaptchaAsVerified"
                  sitekey="6LfqcKIaAAAAAH10CNN9QHQxelvTcaoaUDKCDUZv"
                  class="mt-3 mb-4"
                ></vue-recaptcha>
                <span class="error mb-4 d-block">{{
                  loginForm.pleaseTickRecaptchaMessage
                }}</span>
                <button type="btn" class="btn btn_black">
                  {{ $locale[$lang].buttons.send }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  metaInfo() {
    return {
      title: this.$store.state.metaTitle + ' | ' + 'Collibri',
    };
  },

  data: () => ({
    contactsData: null,
    errors: [],
    name: "",
    phone: "",
    email: "",
    comment: "",
    company: "",
    submitStatus: null,
    loginForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
    },
  }),

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },

    phone: {
      required,
      minLength: minLength(11),
    },

    email: {
      email,
      required,
    },
  },

  methods: {
    markRecaptchaAsVerified(response) {
      this.loginForm.pleaseTickRecaptchaMessage = "";
      this.loginForm.recaptchaVerified = true;
    },

    submit() {
      let formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        comment: this.comment,
        count: this.countValue,
        company: this.company,
      };

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      } else if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage =
          "Подтвердите что вы не робот!";
      } else {
        (this.loginForm.pleaseTickRecaptchaMessage = ""),
          (this.submitStatus = "PENDING");
        this.$axios
          .post(`${this.$store.state.apiUrl}callback`, {
            formData,
          })
          .then((response) => {
            this.submitStatus = "OK";
            setTimeout(() => {
              if ((this.submitStatus = "OK")) {
                this.modal = false;
                this.submitStatus = null;
                this.name = "";
                this.email = "";
                this.phone = "";
                this.comment = "";
                this.countValue = "";
                this.company = "";
                this.$v.$reset();
              }
            }, 3000);
          });
      }
    },
  },

  mounted() {
    this.$axios
      .get(
        `${this.$store.state.apiUrl}get-contacts?lang=${this.$store.state.lang}`
      )
      .then((response) => {
        this.contactsData = response.data;
        this.$store.state.metaTitle = response.data.page_meta.meta_title;
        // this.$store.state.metaDesctiption =
        //   response.data.page_meta.meta_description;
      });
  },
};
</script>

<style></style>
