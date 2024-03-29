import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import Home from "@/views/Home/HomePage.vue";
import EmailVerification from "@/views/EmailVerification/EmailVerificationPage.vue";
import RequestPasswordReset from "@/views/ResetPassword/RequestPasswordReset.vue";
import ChangePassword from "@/views/ResetPassword/ChangePassword.vue";

function loginProps(route) {
  if (route.params) {
    return {
      emailConfirmed: Boolean(route.params.emailConfirmed),
      accountCreated: Boolean(route.params.accountCreated),
      email: route.params.email,
    };
  }
  return null;
}

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home/HomePage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/email-verification",
    name: "emailVerification",
    component: EmailVerification,
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/appointments",
    name: "userAppointments",
    component: () => import("@/views/UserAppointments/UserAppointmentsView.vue"),
    children: [
      {
        path: "",
        name: "appointmentsList",
        components: {
          appointments: () => import("@/views/UserAppointments/AppointmentsList.vue"),
        },
        meta: {
          requiresAuth: true,
          requiredPermissionLevel: "user",
        },
      },
      {
        path: "/make-an-appointment",
        name: "makeAnAppointment",
        components: {
          appointments: () => import("@/views/UserAppointments/MakeAnAppointment.vue"),
        },
        meta: {
          requiresAuth: true,
          requiredPermissionLevel: "user",
        },
      },
    ],
    meta: {
      requiresAuth: true,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact/ContactPage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: () => import("@/views/SignUp/SignUpPage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LogIn/LoginPage.vue"),
    props: loginProps,
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/terms-of-use",
    name: "termsOfUse",
    component: () => import("@/views/TermsOfUsePage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/privacy-policy",
    name: "privacyPolicy",
    component: () => import("@/views/PrivacyPolicyPage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/cookies-policy",
    name: "cookiesPolicy",
    component: () => import("@/views/CookiesPolicyPage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/rodo",
    name: "rodoNotice",
    component: () => import("@/views/RodoNoticePage.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
  },
  {
    path: "/password-reset",
    component: () => import("@/views/ResetPassword/ResetPassword.vue"),
    meta: {
      requiresAuth: false,
      requiredPermissionLevel: "user",
    },
    children: [
      {
        path: "",
        component: RequestPasswordReset,
        name: "resetPassword",
      },
      {
        path: "change",
        component: ChangePassword,
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("@/views/Settings/SettingsPage.vue"),
    meta: {
      requiresAuth: true,
      requiredPermissionLevel: "user",
    },
    children: [
      {
        path: "",
        redirect: { name: "userAccountSettings" },
        name: "settings",
      },
      {
        path: "account",
        component: () => import("@/views/Settings/UserAccountSettings.vue"),
        name: "userAccountSettings",
      },
      {
        path: "account-security",
        component: () => import("@/views/Settings/AccountSecuritySettings.vue"),
        name: "accountSecuritySettings",
      },
      {
        path: "notifications",
        component: () => import("@/views/Settings/NotificationsSettings.vue"),
        name: "notificationsSettings",
      },
      {
        path: "theme",
        component: () => import("@/views/Settings/ThemeSettings.vue"),
        name: "themeSettings",
      },
      {
        path: "language",
        component: () => import("@/views/Settings/LanguageSettings.vue"),
        name: "languageSettings",
      },
      {
        path: "sessions/:id",
        component: () => import("@/views/Settings/SessionView.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("@/views/Dashboard/DashboardPage.vue"),
    meta: {
      requiresAuth: true,
      requiredPermissionLevel: "admin",
    },
    children: [
      {
        path: "",
        // TODO: Create summary view
        // component: () => import("@/views/Dashboard/SummaryView.vue"),
        // name: "summaryView",
        redirect: { name: "appointmentsManagement" },
        name: "dashboard",
      },
      {
        path: "appointments",
        component: () => import("@/views/Dashboard/AppointmentsManagement.vue"),
        name: "appointmentsManagement",
      },
      {
        path: "appointments/:id",
        component: () => import("@/views/Dashboard/AppointmentView.vue"),
      },
      {
        path: "services",
        component: () => import("@/views/Dashboard/ServicesManagement.vue"),
        name: "servicesManagement",
      },
      {
        path: "services/:id",
        component: () => import("@/views/Dashboard/ServiceView.vue"),
      },
      {
        path: "users",
        component: () => import("@/views/Dashboard/UsersManagement.vue"),
        name: "usersManagement",
      },
      {
        path: "users/:id",
        component: () => import("@/views/Dashboard/UserView.vue"),
      },
      {
        path: "work-hours",
        component: () => import("@/views/Dashboard/WorkHoursManagement.vue"),
        name: "workHoursManagement",
      },
      {
        path: "stats",
        component: () => import("@/views/Dashboard/StatsView.vue"),
        name: "statsView",
      },
      {
        path: "settings",
        component: () => import("@/views/Dashboard/ServiceSettings.vue"),
        name: "serviceSettings",
      },
    ],
  },
  {
    path: "/insufficient-permissions",
    name: "insufficientPermissions",
    component: () => import("@/views/InsufficientPermissionsPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("@/views/PageNotFound/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  default: Home,
});

router.beforeEach(async (to) => {
  store.commit("setNavigationStatus", "inProgress");
  await store.dispatch("loadAuthData");
  if (store.getters.isLoggedIn) {
    if (to.name === "login" || to.name === "sign-up") return "/";
  }
  if (to.meta.requiresAuth) {
    if (!store.getters.isLoggedIn) {
      return { name: "login" };
    }
    switch (to.meta.requiredPermissionLevel) {
      case "admin": {
        if (!store.getters.isAdmin) {
          return {
            name: "insufficientPermissions",
          };
        }
        break;
      }
      case "owner": {
        if (!store.getters.isOwner) {
          return {
            name: "insufficientPermissions",
          };
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  return true;
});

router.afterEach((_to, _from, failure) => {
  if (failure) {
    store.commit("setNavigationStatus", "failure");
  } else {
    store.commit("setNavigationStatus", "success");
  }
});

export default router;
