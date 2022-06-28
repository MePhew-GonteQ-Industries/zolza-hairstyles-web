<template>
    <div class="footer-basic">
      <div class="info-section">
        <ul>
          <li><span>© 2022 Zołza Hairstyles</span></li>
        </ul>
      </div>

      <div class="contact">
        <ul>
          <li><router-link class="link" to="/terms">{{ t('footer[0]') }}</router-link>
          </li>
          <li>
            <router-link class="link" to="/privacy-policy">{{ t('footer[1]') }}
            </router-link>
          </li>
          <li>
              <a href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161" target="_blank">
                <i class="ph-facebook-logo-light"></i>
              </a>
          </li>
          <li>
            <a href="https://www.instagram.com/zolza_hairstyles/" target="_blank">
              <i class="ph-instagram-logo-light"></i>
            </a>
          </li>
          <li>
            <a href="tel:+48 730 601 830" target="_blank">
              <i class="ph-phone-light"></i>
            </a>
          </li>
          <li>
            <a href="mailto: zolza.hairstyles@gmail.com" target="_blank">
              <i class="ph-envelope-simple-light"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'contactSection',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  },
};
</script>

<style lang='scss' scoped>
.footer-basic {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  background-color: white;
  height: 5rem;
  box-sizing: content-box;

  i {
    font-size: 28px;
  }

  li, a {
    color: #28262c;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.link {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .contact ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
