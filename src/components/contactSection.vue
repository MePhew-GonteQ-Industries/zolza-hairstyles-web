<template>
    <div class="footer-basic">
      <div class="info-section">
        <span>© 2021 Zołza Hairstyles</span>
        <ul>
          <li class="list-inline-item"><router-link to="/terms">Terms of use</router-link>
          </li>
          <li class="list-inline-item"><router-link to="/privacyPolicy">Privacy policy</router-link>
          </li>
        </ul>
      </div>

      <div class="contact">
        <ul>
          <li>
            <a href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161" target="_blank">
              <img src="@/assets/facebook_mono.svg"
                   class="d-block" loading="lazy" decoding="async" alt="Facebook icon" width="18"
                   height="18">
            </a>
            <a href="https://www.instagram.com/zolza_hairstyles/" target="_blank">
              <img src="@/assets/instagram_mono.svg"
                   class="d-block" loading="lazy" decoding="async" alt="Instagram icon" width="18"
                   height="18">
            </a>
            <a href="tel:+48 730 601 830" target="_blank">
              <img src="@/assets/phone.svg"
                   class="d-block" loading="lazy" decoding="async" alt="Phone icon" width="18"
                   height="18">
            </a>
            <a href="mailto: zolza.hairstyles@gmail.com" target="_blank">
              <img id="email" src="@/assets/email.svg"
                   class="d-block" loading="lazy" decoding="async" alt="Email icon"
                   height="18">
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'contact-section',
};
</script>

<style lang='scss' scoped>

  .footer-basic {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $footer-fg-color;
    font-size: 14px;

    @media only screen and (max-width: 510px) {
      & {
        flex-flow: column;
      }
    }

    @media only screen and (max-width: 370px) {
      & {
        font-size: 12px;
      }
    }

    .info-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .contact {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ul {
      margin-left: 20px;

      @media only screen and (max-width: 645px) {
        & {
          margin-left: 10px;
        }
      }

      @media only screen and (max-width: 510px) {
        & {
          margin-left: 2px;
        }
      }

      @media only screen and (max-width: 320px) {
        & {
          margin-left: 0;
        }
      }

      li {
        display: inline-block;

        a {
          color: $footer-fg-color;
          font-size: 14px;

          &:hover {
            color: $hover-color;
            text-decoration: underline;
          }

          @media only screen and (max-width: 370px) {
            & {
              font-size: 12px;
            }
          }

          @media only screen and (max-width: 320px) {
            & {
              padding: 4px;
            }
          }

          @media only screen and (max-width: 315px) {
            & {
              padding: 3px;
            }
          }
        }
      }
    }

  }
</style>
