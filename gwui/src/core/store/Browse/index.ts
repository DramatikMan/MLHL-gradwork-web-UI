import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {
    loading: true,
    categories: {},
    request: {
        quantity: 1,
        category: null,
        palette: "RGB",
        color: null,
    },
    requesting: false,
    images: [],
    isError: false,
    showImages: false,
};

export const use: types.Store = defineStore("Browse", {
    state: () => initial,
    actions: {
        setLoading(value) {
            this.loading = value;
        },
        setCategories(value) {
            const categories: Record<string, number> = {};
            for (const category of value) categories[category.title] = category.uid;
            this.categories = categories;
        },
        setRequestQuantity(value) {
            this.request.quantity = value;
        },
        setRequestCategory(value) {
            this.request.category = value;
        },
        setRequestPalette(value) {
            this.request.palette = value;
        },
        setRequestColor(value) {
            this.request.color = value;
        },
        setRequesting(value) {
            this.requesting = value;
        },
        setImages(value) {
            this.images = value;
        },
        setIsError(value) {
            this.isError = value;
        },
        setShowImages(value) {
            this.showImages = value;
        },
    },
});
