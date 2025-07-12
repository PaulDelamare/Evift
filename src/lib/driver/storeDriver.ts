import { writable } from "svelte/store";

export const openBurger = writable(false);

export const friendPage = writable(false);
export const openAddFriend = writable(false);
export const closeModal = writable(false);