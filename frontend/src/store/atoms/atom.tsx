import { atom } from "recoil";

export const cropNameAtom = atom({
    key: "cropNameAtom",
    default: ""  // Default as a string
});

export const locationAtom = atom({
    key: "locationAtom",
    default: ""  // Default as a string
});

export const soilTypeAtom = atom({
    key: "soilTypeAtom",
    default: ""  // Default as a string
});
