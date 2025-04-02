<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostTable from "@/features/post/components/post-table.vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> POST </CardTitle>
    </CardHeader>
    <CardContent>
      <PostTable />
    </CardContent>
  </Card>
</template>
