<template>
  <div class="footer-basic">
    <div class="info-section">
      <ul>
        <li>
          <span class="copyright-note"
            ><i class="ph-copyright-light"></i> {{ new Date().getFullYear() }} Zołza
            Hairstyles</span
          >
        </li>
      </ul>
    </div>

    <div class="policy">
      <ul>
        <li>
          <router-link
            class="link"
            to="/terms-of-use"
            >{{ t("footer[0]") }}</router-link
          >
        </li>
        <li>
          <router-link
            class="link"
            to="/privacy-policy"
            >{{ t("footer[1]") }}
          </router-link>
        </li>
        <li>
          <router-link
            class="link"
            to="/cookies-policy"
            >{{ t("footer[2]") }}
          </router-link>
        </li>
        <li>
          <router-link
            class="link"
            to="/rodo"
            >{{ t("footer[3]") }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="contact">
      <ul>
        <li>
          <a
            href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161"
            target="_blank"
            aria-label="facebook"
          >
            <i class="ph-facebook-logo-light"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/zolza_hairstyles/"
            target="_blank"
            aria-label="Instagram"
          >
            <i class="ph-instagram-logo-light"></i>
          </a>
        </li>
        <li>
          <a
            href="tel:+48 730 601 830"
            target="_blank"
            aria-label="Numer telefonu"
          >
            <i class="ph-phone-light"></i>
          </a>
        </li>
        <li>
          <a
            href="mailto:zolza.hairstyles@gmail.com"
            target="_blank"
            aria-label="Adres email"
          >
            <i class="ph-envelope-simple-light"></i>
          </a>
        </li>
        <li>
          <CustomModal v-model:open="devsModalOpen">
            <template #title> Deweloperzy platformy Zołza Hairstyles </template>
            <h1>Strona interetowa</h1>
            <GitHubCard username="Me-Phew" />
            <GitHubCard username="biQte" />
            <h1>Projekt graficzny</h1>
            <GitHubCard username="Amaczi" />
            <h1>Aplikacja mobilna</h1>
            <GitHubCard username="biQte" />
          </CustomModal>
          <i
            class="ph-file-code-light code-icon"
            @click="toggleDevsModal"
            @keydown.enter="toggleDevsModal"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomModal from "@/components/CustomModal.vue";
import GitHubCard from "@/components/GitHubCard.vue";

export default {
  name: "contactSection",
  components: {
    CustomModal,
    GitHubCard,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const devsModalOpen = ref(false);

    const toggleDevsModal = () => {
      devsModalOpen.value = !devsModalOpen.value;
    };

    return {
      t,
      devsModalOpen,
      toggleDevsModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer-basic {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  background-color: $primary-color;
  height: 5rem;
  box-sizing: content-box;

  .info-section {
    .copyright-note {
      display: flex;
      align-items: center;

      @media only screen and (max-width: $xs) {
        font-size: 0.7rem;
      }

      i {
        font-size: 1.375rem;
        margin: 0 5px;

        @media only screen and (max-width: $xs) {
          font-size: 1rem;
        }
      }
    }
  }

  i {
    font-size: 28px;

    @media only screen and (max-width: $xs) {
      font-size: 1.2rem;
    }
  }

  li {
    font-size: 1rem;

    .code-icon {
      margin: 0 5px 0 5px;
      cursor: pointer;
    }
  }

  a {
    font-size: 0.875rem;
  }

  li,
  a {
    color: $primary-text-color;
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.link {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .contact,
  .policy,
  .policy ul,
  .contact ul,
  li,
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media only screen and (max-width: $xs) {
    .footer-basic {
      height: 3rem;

      .info-session {
        ul {
          li {
            .copyright-note {
              font-size: 0.3rem;

              .ph-copyright-light::before {
                margin: 0 2px;
                font-size: 15px;
              }
            }
          }
        }
      }

      i {
        font-size: 20px;
      }

      a {
        font-size: 0.5rem;
      }
    }

    .policy {
      display: none;
    }
  }
}
</style>
