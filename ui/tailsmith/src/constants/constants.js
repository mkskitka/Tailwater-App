export const ANOMALY_FIELDS = [
    "MassAnomaly",
    "MeterPressureAnomaly",
    "MeterTemperatureAnomaly",
    "ObservedDensityAnomaly",
    "MassDerivAnomaly",
    "MeterPressureDerivAnomaly",
    "MeterTemperatureDerivAnomaly",
    "ObservedDensityDerivAnomaly"
]

export const MASS_ANOMALY = "MassAnomaly";
export const METER_PRESSURE_ANOMALY = "MeterPressureAnomaly";
export const METER_TEMPERATURE_ANOMALY = "MeterTemperatureAnomaly";
export const OBSERVED_DENSITY_ANOMALY = "ObservedDensityAnomaly";
export const MASS_DERIV_ANOMALY = "MassDerivAnomaly";
export const METER_PRESSURE_DERIV_ANOMALY = "MeterPressureDerivAnomaly";
export const METER_TEMPERATURE_DERIV_ANOMALY = "MeterTemperatureDerivAnomaly";
export const OBSERVED_DENSITY_DERIV_ANOMALY = "ObservedDensityDerivAnomaly";

/* Alert Views */
export const DETAILS_VIEW = "detailsView";
export const COMMENTS_VIEW = "commentsView";

/* Map Window Views */
export const STICK_VIEW = "stickView";
export const GEO_VIEW = "geoView";
export const FINANCIAL_VIEW = "financialView";
export const FINANCIAL_VIEW_2 = "financialView_2";

export const locations_map = {
            "NHC": {cx:'24%', cy:"0%", anomalous: false},
            "Waynoka": {cx: '39%', cy: "6%", anomalous: false},
            "Cimarron": {cx: '36%', cy: '17%', anomalous: true},
            "Okarche": {cx: '50%', cy:'24%', anomalous: false},
            "Kingfisher": {cx: '63%', cy:'21%', anomalous: false},
            "Cushing": {cx: "76%", cy: "15%", anomalous: false},
            "White Cliffs Receipt": {cx: "71.5%", cy: "15%", anomalous:false},
            "Sholem": {cx: "51%", cy: "40%", anomalous: false},
            "Panova PS": {cx: "67.5%", cy: "35%", anomalous: false},
            "Pauls Valley PS": {cx: "65%", cy: "40%", anomalous: false},
            "Hennepin": {cx: "64%", cy: "47%", anomalous: false},
            "Velma": {cx: "51%", cy: "50%", anomalous: false},
            "Ringling PS" : { cx: "58.5%", cy: "53%", anomalous: false},
            "Longhorn": {cx: "61.5%", cy: "56.5%", anomalous: false},
            "Chico": {cx: '58%', cy: '57.6%', anomalous: false},
            "Files Valley PS": {cx: '58.5%', cy: '67%', anomalous: false},
            "Teague PS": { cx: "63%", cy: "78%", anomalous: false}
           };
