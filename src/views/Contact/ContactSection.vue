<template>
    <div class="footer-basic">
      <div class="info-section">
        <ul>
          <li class="list-inline-item"><span>© 2022 Zołza Hairstyles</span></li>
          <li class="list-inline-item"><router-link to="/terms">{{$t('footer[0]')}}</router-link>
          </li>
          <li class="list-inline-item"><router-link to="/privacy-policy">{{$t('footer[1]')}}
          </router-link>
          </li>
        </ul>
      </div>

      <div class="contact">
        <ul>
          <li>
              <a href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161" target="_blank">
                <img
                    src="@/assets/footer/facebook_mono.svg"
                    class="social-media-icon"
                    loading="lazy" decoding="async" alt="Facebook" width="21"
                    height="21">
              </a>
          </li>
          <li>
            <a href="https://www.instagram.com/zolza_hairstyles/" target="_blank">
              <img src="@/assets/footer/instagram_mono.svg"
                   class="social-media-icon"
                   loading="lazy" decoding="async" alt="Instagram" width="21"
                   height="21">
            </a>
          </li>
          <li>
            <a href="tel:+48 730 601 830" target="_blank">
              <img src="@/assets/footer/phone.svg"
                   class="social-media-icon"
                   loading="lazy" decoding="async" alt="Phone" width="21"
                   height="21">
            </a>
          </li>
          <li>
            <a href="mailto: zolza.hairstyles@gmail.com" target="_blank">
              <img src="@/assets/email.svg"
                   class="social-media-icon"
                   loading="lazy" decoding="async" alt="Email"
                   width="21" height="21">
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'contactSection',
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
    padding: 0 10%;

    &:lang(en) {
      @media only screen and (max-width: 800px) {
        padding: 0 5%;
      }

      @media only screen and (max-width: 540px) {
        padding: 0 3%;
      }

      @media only screen and (max-width: 510px) {
        & {
          flex-flow: column;
          padding: 0 2% 5px 2%;
        }
      }

      @media only screen and (max-width: 380px) {
        & {
          font-size: 12px;
        }
      }
    }

    .info-section {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .contact {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    ul {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;

      li {
        display: inline-block;
        padding: 0 5px;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }

        a {
          user-select: none;
          color: $footer-fg-color;
          font-size: 14px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          &.router-link-active {
            color: $link-active-color;
          }

          &:hover {
            color: $hover-color;
            text-decoration: underline;
          }

          @media only screen and (max-width: 380px) {
            & {
              font-size: 12px;
            }
          }

          img {
            &.social-media-icon {
              filter: $footer-icon-filter;

              &:hover {
                filter: $footer-icon-hover-filter;
              }

              @media only screen and (max-width: 1000px) {
                height: 18px;
                width: 18px;
              }
            }
          }
        }
      }
    }

  }
</style>
