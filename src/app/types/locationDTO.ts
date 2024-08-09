import LatLngLiteral = google.maps.LatLngLiteral;

export interface LocationDTO {
  coordinates: number[],
  name: string
}

export interface Location {
  position: LatLngLiteral;
  name: string;
}
