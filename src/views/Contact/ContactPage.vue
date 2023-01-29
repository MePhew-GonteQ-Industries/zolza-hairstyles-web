<template>
  <section class="app-page" id="contact-page">
    <div id="business-card">
      <div class="data">
        <a href="tel:+48 730 601 830" target="_blank" aria-label="Numer telefonu">
          <img class="contact-info" src="@/assets/wizytowka-tel.svg" alt="" />
        </a>
        <a href="https://www.instagram.com/zolza_hairstyles/" target="_blank"
          aria-label="Instagram">
          <img class="contact-info social" src="@/assets/wizytowka-insta.svg" alt="" />
        </a>
        <a href="https://www.facebook.com/Zo%C5%82za-Hairstyles-110103241392161" target="_blank"
          aria-label="Facebook">
          <img class="contact-info social" src="@/assets/wizytowka-fb.svg" alt="" />
        </a>
        <a href="mailto:zolza.hairstyles@gmail.com" target="_blank" aria-label="Adres email">
          <img class="contact-info" src="@/assets/wizytowka-mail.svg" alt="" />
        </a>
      </div>
    </div>
    <div class="map-embed">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d212.5378679341409!2d20.451990281448932!3d49.76391922764475!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47161d4311f4a03f%3A0x364cc2230149c9!2sZo%C5%82za%20Hairstyles!5e0!3m2!1sen!2spl!4v1670230667253!5m2!1sen!2spl"
        width="600" height="450" style="border:0;" allowfullscreen loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
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
}

@media only screen and (max-width: $xs) {
  #contact-page {
    padding: 20px 0;

    #business-card {
      display: flex;
      background-image: none;
      background-color: white;
      flex-direction: column;
      width: 90vw;
      justify-content: center;
    }

    .map-embed {
      width: 90vw;

      iframe {
        width: 90vw;
        border-radius: 20px;
      }
    }
  }
}
</style>
