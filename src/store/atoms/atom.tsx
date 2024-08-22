import { atom } from "recoil";


export const cropInputInfoAtom = atom({
    key: "cropInputInfoAtom",
    default:{
        cropName: "",
        location: "",
        soilType: ""
    }
});


