<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div class="sidebar">
        <CustomHamburgerIcon class="custom-hamburger-icon"
        @slide-sidebar="slideSidebar"
        :navbarActive="sidebarActive"/>
        <div class="sidebar-wrapper">
            <div class="sidebar-menu"
            :class="{'sidebar-active': sidebarActive}">
                <div class="nav-section"
                @click="slideSidebar">
                    <router-link to="/">{{ t('nav.primaryNav[0]') }}</router-link>
                    <router-link v-if="$store.getters.isLoggedIn && $store.getters.isAdmin"
                    to="/dashboard">{{ t('nav.primaryNav[1]') }}</router-link>
                    <router-link to="/contact">{{ t('nav.primaryNav[2]') }}</router-link>
                </div>
                <div class="footer-section"
                @click="slideSidebar">
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
        <div class="sidebar-background"
        :class="{'sidebar-menu-background': sidebarActive}"
        @click.self="slideSidebar">
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import CustomHamburgerIcon from './CustomHamburgerIcon.vue';

export default {
  name: 'customSidebar',
  components: {
    CustomHamburgerIcon,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const sidebarActive = ref(false);

    function slideSidebar() {
      console.log('this');
      sidebarActive.value = !sidebarActive.value;
      console.log('slide');
    }

    return {
      slideSidebar,
      sidebarActive,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
    .sidebar{
        .custom-hamburger-icon{
                position: absolute;
                top: 22px;
                left: 5vw;
                display: block;
                transform: translateX(100vw);
                z-index: 2500;
            }
        .sidebar-wrapper{
            height: 100%;
            width: 100%;
            z-index: 8;
            // background-color: rgba(0,0,0,0.5);
            // transform: translateX(100vw);
            // transition: transform 0.2 ease-in;
            .sidebar-menu{
                padding: 10vh 0;
                width: 50vw !important;
                height: 100%;
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
                        &.router-link-active{
                            color: $accent-color;
                        }
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
        .sidebar-background{
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: rgba(0,0,0,0.5);
                transform: translateX(100vw);
                display: none;
                transition: display 2s ease-in-out;
            }
        .sidebar-active{
            transform: translateX(100vw);
        }
        .sidebar-menu-background{
            display: block;
        }
    }
</style>
