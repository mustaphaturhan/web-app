import { polygon, area } from '@turf/turf';

interface FeatureGeometry {
  coordinates: number[][][];
}

interface Feature {
  geometry: FeatureGeometry;
}

export const calcArea = (feature: Feature): number => {
  try {
    const polygonFeature = polygon(feature.geometry.coordinates);
    return area(polygonFeature) / 1000000;
  } catch {
    return -1;
  }
};

export const isValidCoordinates = (
  lat: string | number,
  lng: string | number
): boolean => {
  const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const ck_lng = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  const validLat = ck_lat.test(String(lat));
  const validLon = ck_lng.test(String(lng));
  return validLat && validLon;
};
