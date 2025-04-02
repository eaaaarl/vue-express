<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import NavUser from "./NavUser.vue";
import TeamSwitcher from "./TeamSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareTerminal,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import NavMain from "./NavMain.vue";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Post",
      url: "/post",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
};
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <!--   <NavProjects :projects="data.projects" /> -->
    </SidebarContent>
    <SidebarFooter>
      <NavUser
        v-if="authStore.user"
        :user="authStore.user"
        :logout="handleLogout"
      />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
