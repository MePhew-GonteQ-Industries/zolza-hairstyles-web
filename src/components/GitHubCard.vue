<template>
  <div
    tabindex="0"
    class="github-card"
  >
    <template v-if="profileData">
      <img
        class="user-avatar"
        :src="profileData.avatar_url"
        alt=""
      />
      <a
        :href="profileData.html_url"
        target="_blank"
        class="profile-link"
        >{{ profileData.login }}</a
      >
      <LinkButton
        type="secondary"
        class="follow-btn"
        mode="link"
        :to="profileData.following_url"
        target="_blank"
        >Follow</LinkButton
      >
      <img
        class="github-mark"
        :src="$store.state.settings.theme === 'dark' ? GitHubMarkLight : GitHubMarkDark"
        alt="GitHub Mark"
      />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { createRequestErrorMessage } from "@/utils";
import { ref, onMounted } from "vue";
import LinkButton from "@/components/CustomButton.vue";
import GitHubMarkLight from "@/assets/GitHub-Mark-Light-32px.png";
import GitHubMarkDark from "@/assets/GitHub-Mark-32px.png";

export default {
  name: "GitHubCard",
  components: {
    LinkButton,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const profileData = ref(null);

    onMounted(async () => {
      try {
        const { data } = await axios.get(`github_user/${props.username}`);
        profileData.value = data;
      } catch (error) {
        console.error(createRequestErrorMessage(error));
      }
    });

    return {
      profileData,
      GitHubMarkLight,
      GitHubMarkDark,
    };
  },
};
</script>

<style lang="scss" scoped>
.github-card {
  display: grid;
  grid-template-columns: 48px auto 90px 32px;
  align-items: center;
  gap: 1rem;
  padding: 0;
  background-color: $secondary-color;
  padding: 0.5rem 1rem;
  border-radius: 0.313rem;

  .profile-link {
    color: $accent-color;

    &:hover {
      text-decoration: underline;
    }
  }

  .follow-btn {
    height: 80%;
  }
}

.user-avatar {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}
</style>
