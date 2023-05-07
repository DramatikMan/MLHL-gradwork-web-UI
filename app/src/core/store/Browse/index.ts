import {defineStore} from "pinia";

import type {Category} from "😺/types";
import * as types from "./types";

const initial: types.State = {
    loading: true,
    categories: {},
    request: {
        quantity: 1,
        category: null,
        palette: null,
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
        setLoading(value: types.State["loading"]) {
            this.loading = value;
        },
        setCategories(value: Category[]) {
            const categories: Record<string, number> = {};
            for (const category of value) categories[category.title] = category.uid;
            this.categories = categories;
        },
        setRequestQuantity(value: types.Request["quantity"]) {
            this.request.quantity = value;
        },
        setRequestCategory(value: types.Request["category"]) {
            this.request.category = value;
        },
        setRequestPalette(value: types.Request["palette"]) {
            this.request.palette = value;
        },
        setRequestColor(value: types.Request["color"]) {
            this.request.color = value;
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
