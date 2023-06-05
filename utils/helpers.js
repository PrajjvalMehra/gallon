import { getUnit } from "./asyncStorage";
function unitValueDisplay(ml) {
    getUnit().then((unit) => {
        if (unit == "ml") {
            return ml;
        }
        const factor = Math.pow(10, 1); // Change the 0 to any number of decimal places you want to keep
        const oz = ml * 0.033814;
        const roundedOz = Math.ceil(oz * factor) / factor;
        return roundedOz;
    });
}

export { unitValueDisplay };
