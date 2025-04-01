<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schema/login.schema";
import { useAuthStore } from "@/stores/auth.store";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref("");
const isLoading = ref(false);

const form = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  const result = await authStore.login({
    email: values.email,
    password: values.password,
  });
  if (result?.success) {
    toast.success(result.message);
    router.push("/dashboard");

    form.resetForm();
  } else {
    toast.error(result?.message ?? "Login failed, please try again.");
  }
  isLoading.value = false;
});

const loginWithGoogle = () => {
  console.log("Google login clicked");
};
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid gap-4">
          <div
            v-if="errorMessage"
            class="p-3 text-sm text-red-500 bg-red-50 rounded-md"
          >
            {{ errorMessage }}
          </div>

          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "Login" }}
          </Button>

          <Button
            variant="outline"
            class="w-full"
            type="button"
            @click="loginWithGoogle"
          >
            Login with Google
          </Button>
        </div>

        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline">Sign up</a>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
