<template>
    <div class="sidebar-background">
        <div class="sidebar">
            <div class="nav-section">
                <router-link to="/">{{ t('nav.primaryNav[0]') }}</router-link>
                <router-link v-if="$store.getters.isLoggedIn && $store.getters.isAdmin"
                to="/dashboard">{{ t('nav.primaryNav[1]') }}</router-link>
                <router-link to="/contact">{{ t('nav.primaryNav[2]') }}</router-link>
            </div>
            <div class="footer-section">
                <router-link class="link" to="/terms-of-use">{{
                    t("footer[0]")
                }}</router-link>
                <router-link class="link" to="/privacy-policy"
                    >{{ t("footer[1]") }}
                </router-link>
                <router-link class="link" to="/cookies-policy"
                    >{{ t("footer[2]") }}
                </router-link>
                <router-link class="link" to="/rodo"
                    >{{ t("footer[3]") }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'customSidebar',
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return {
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
    .sidebar-background{
        height: 100%;
        width: 100%;
        z-index: 8;
        background-color: rgba(0,0,0,0.5);
        .sidebar{
            padding: 10vh 0;
            width: 45vw !important;
            background-color: $primary-color;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .nav-section{
                display: flex;
                flex-direction: column;
                a{
                    color: $main-section-color;
                    padding: 1.5vh 0 0 2vw;
                }
            }
            .footer-section{
                display: flex;
                flex-direction: column;
                a{
                    color: $main-section-color;
                    padding: 1.5vh 0 0 2vw;
                }
            }
        }
    }
</style>
