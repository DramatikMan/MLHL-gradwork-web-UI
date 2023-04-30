import {defineStore} from "pinia";

import type {Category} from "😺/types";
import * as t from "./types";

const initial: t.State = {
    loading: true,
    categories: {},
    selectedQuantity: 1,
    selectedCategory: "Bean",
    requesting: false,
};

export const use: t.Store = defineStore("Browse", {
    state: () => initial,
    actions: {
        setLoading(value: t.State["loading"]) {
            this.loading = value;
        },
        setCategories(value: Category[]) {
            const categories: Record<string, number> = {};
            for (const category of value) categories[category.title] = category.uid;
            this.categories = categories;
        },
        setSelectedQuantity(value: t.State["selectedQuantity"]) {
            this.selectedQuantity = value;
        },
        setSelectedCategory(value: t.State["selectedCategory"]) {
            this.selectedCategory = value;
        },
        setRequesting(value: t.State["requesting"]) {
            this.requesting = value;
        },
    },
});
