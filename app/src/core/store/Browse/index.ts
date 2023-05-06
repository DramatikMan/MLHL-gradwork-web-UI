import {defineStore} from "pinia";

import type {Category} from "😺/types";
import * as types from "./types";

const initial: types.State = {
    loading: true,
    categories: {},
    selectedQuantity: 1,
    selectedCategory: null,
    requesting: false,
    images: [],
    isError: false,
    showImages: false,
};

export const use: types.Store = defineStore("Browse", {
    state: () => initial,
    actions: {
        setLoading(value: types.State["loading"]) {
            this.loading = value;
        },
        setCategories(value: Category[]) {
            const categories: Record<string, number> = {};
            for (const category of value) categories[category.title] = category.uid;
            this.categories = categories;
        },
        setSelectedQuantity(value: types.State["selectedQuantity"]) {
            this.selectedQuantity = value;
        },
        setSelectedCategory(value: types.State["selectedCategory"]) {
            this.selectedCategory = value;
        },
        setRequesting(value: types.State["requesting"]) {
            this.requesting = value;
        },
        setImages(value: types.State["images"]) {
            this.images = value;
        },
        setIsError(value: types.State["isError"]) {
            this.isError = value;
        },
        setShowImages(value: types.State["showImages"]) {
            this.showImages = value;
        },
    },
});
