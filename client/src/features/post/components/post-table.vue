<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Content</TableHead>
        <TableHead>Published</TableHead>
        <TableHead>Author</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>1</TableCell>
        <TableCell>2</TableCell>
        <TableCell>2</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
