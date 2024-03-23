![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MePhew-GonteQ-Industries/zolza-hairstyles-web/build-deploy.yml?logo=bilibili&style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/MePhew-GonteQ-Industries/zolza-hairstyles-web?color=8bd5ca&logo=starship&style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/MePhew-GonteQ-Industries/zolza-hairstyles-web?logo=github&style=for-the-badge)

![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FMePhew-GonteQ-Industries%2Fzolza-hairstyles-uptime%2Fmaster%2Fapi%2Fzolza-hairstyles%2Fuptime.json&style=for-the-badge)
![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FMePhew-GonteQ-Industries%2Fzolza-hairstyles-uptime%2Fmaster%2Fapi%2Fzolza-hairstyles%2Fresponse-time.json&style=for-the-badge)

# Zołza Hairstyles Hairdressing Salon

## Appointments management system - website repo

### List of the features that have been implemented so far:

- [x] [Home page featuring an image gallery and mobile app advertisement](https://zolza-hairstyles.pl/)
- [x] [Contact page showing the salon location on Google Maps](https://zolza-hairstyles.pl/contact)
- [x] User accounts
  - [x] [Registration](https://zolza-hairstyles.pl/sign-up)
  - [x] Account activation via email
  - [x] [Logging in](https://zolza-hairstyles.pl/sign-up)
  - [x] [Password reset via email](https://zolza-hairstyles.pl/password-reset)
  - [x] Account types with diffrent permissions (users, admins and the owner)
- [ ] Booking appointments:
  - [x] Booking through the appointments page by first selecting a service and then followed by selecting a date
        ![Alt text](/screenshots/appointment-booking.png "Appointment Booking")
  - [ ] Quick booking from the home page
- [ ] Administration dashboard
  - [ ] Business summary and overview
  - [ ] Appointments management
  - [ ] Services management
  - [ ] Users administration
  - [ ] Work hours management
  - [ ] Business statistics
  - [ ] Administrative settings
- [ ] Settings
  - [x] Updating user data (name, surname and gender)
  - [x] Account deletion
  - [ ] Account security
    - [x] Password change
    - [x] Active sessions management
      - [x] Log out of every session seperately
      - [x] Log out everywhere
      - [x] Show location on a map based on IP address
    - [ ] Two Factor Authentication
  - [ ] Notification settings
    - [ ] Appointment reminders
    - [ ] New functionality added
  - [ ] Themes
    - [x] Dark theme
          ![Alt text](/screenshots/dark-theme.png "Dark theme preview")
    - [ ] Light theme
          ![Alt text](/screenshots/light-theme.png "Light theme preview")
  - [x] Internalization
    - [x] Translations
      - [x] Polish
      - [x] English
- [x] Legal requirements
  - [x] Cookies consent banner
  - [x] [Terms of Use](https://zolza-hairstyles.pl/terms-of-use)
  - [x] [Privacy policy](https://zolza-hairstyles.pl/privacy-policy)
  - [x] [Cookies policy](https://zolza-hairstyles.pl/cookies-policy)
  - [x] [GDPR](https://zolza-hairstyles.pl/rodo)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
