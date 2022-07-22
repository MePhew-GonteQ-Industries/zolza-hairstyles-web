<template>
  <section class="app-page" id="contact-page">
    <div id="business-card">
      <div class="data">
        <a href="tel:+48 730 601 830" target="_blank" aria-label="Numer telefonu">
          <img class="contact-info" src="@/assets/wizytowka-tel.svg" alt="" />
        </a>
        <a href="https://www.instagram.com/zolza_hairstyles/" target="_blank" aria-label="Instagram">
          <img
            class="contact-info social"
            src="@/assets/wizytowka-insta.svg"
            alt=""
          />
        </a>
        <a
          href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161"
          target="_blank"
          aria-label="Facebook"
        >
          <img
            class="contact-info social"
            src="@/assets/wizytowka-fb.svg"
            alt=""
          />
        </a>
        <a href="mailto: zolza.hairstyles@gmail.com" target="_blank" aria-label="Adres email">
          <img class="contact-info" src="@/assets/wizytowka-mail.svg" alt="" />
        </a>
      </div>
    </div>
    <div class="map-embed">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2577.00313257824!2d20.43720801576937!3d49.7671980442397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47161c1940fa6b8d%3A0x772da23dd0ae7d2!2sLaskowa%20G%C3%B3rna%2C%2034-602%20Laskowa!5e0!3m2!1sen!2spl!4v1655989117472!5m2!1sen!2spl"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Google maps embed"
      ></iframe>
    </div>
    <div class="contact-form"></div>
  </section>
</template>

<style lang="scss" scoped>
#contact-page {
  padding: 100px 0;
  gap: 50px;

  #business-card {
    height: 400px;
    width: 675px;
    background-color: $primary-color;
    background-image: url("@/assets/wizytowka-tlo.svg");
    background-size: cover;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    backface-visibility: hidden;
    cursor: pointer;

    &.flipped {
    }

    .data {
      grid-column-start: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 25px;

      .contact-info {
        width: 250px;
        padding: 10px;
        border-radius: 5px;

        &:hover {
          transform: scale(1.1);
        }

        &.social {
          width: 200px;
        }
      }
    }
  }

  .map-embed {
  }
}
</style>
