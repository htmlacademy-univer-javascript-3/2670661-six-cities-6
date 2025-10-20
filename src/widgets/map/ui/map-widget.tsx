import {FC} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Coordinates} from '../../../shared/types/coordinates.ts';
import {PointOnMap} from '../model/types.ts';

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

type MapWidgetProps = {
  mapCenter: Coordinates;
  markers?: PointOnMap[];
};

export const MapWidget: FC<MapWidgetProps> = ({mapCenter, markers = []}) => {
  return (
    <MapContainer
      center={[mapCenter.latitude, mapCenter.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      className="cities__map map"
    >
      <TileLayer attribution={ATTRIBUTION} url={URL}/>
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.coordinates.latitude, marker.coordinates.longitude]}>
          {marker.popupNode && <Popup>{marker.popupNode}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
};
