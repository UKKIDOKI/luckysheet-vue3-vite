import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSheetStore = defineStore(
    'sheet',
    () => {
    const sheetItem = ref({});

    return { sheetItem }

  },
  {
    persist: true,
  },
);


