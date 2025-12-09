import React, { useMemo } from "react";
import { Layer, Marker, Source, useMap } from "react-map-gl/maplibre";
import * as turf from "@turf/turf";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";

interface Props {
  places: Places;
}

const PlaceIndicator = ({ places }: Props) => {
  const { current: map } = useMap();
  const circles: FeatureCollection<Geometry, GeoJsonProperties> =
    useMemo(() => {
      let features: Feature<Geometry, GeoJsonProperties>[] = [];
      places.places.forEach((place) => {
        const feature = turf.circle(
          [place.longitude, place.latitude],
          place.radius,
          {
            units: "meters",
          }
        );

        features.push(feature);
      });
      return {
        type: "FeatureCollection",
        features: features,
      };
    }, [places]);

  return (
    <>
      <Source id="circle-source" type="geojson" data={circles}>
        <Layer
          id="circle-fill"
          type="fill"
          paint={{
            "fill-color": "#8CCFFF",
            "fill-opacity": 0.5,
          }}
        />
        <Layer
          id="circle-outline"
          type="line"
          paint={{
            "line-color": "#007bff",
            "line-width": 2,
          }}
        />
      </Source>

      {places.places.map((place) => (
        <Marker
          longitude={place.longitude}
          latitude={place.latitude}
          key={place.id}
        >
          <button
            className="appearance-none"
            onClick={() =>
              map?.flyTo({
                center: [place.longitude, place.latitude],
                zoom: 15,
                duration: 1000,
              })
            }
          >
            <h1 className="text-black/50 font-extrabold text-sm px-2 bg-black/10 rounded-sm backdrop-blur-md">
              {place.name}
            </h1>
          </button>
        </Marker>
      ))}
    </>
  );
};

export default PlaceIndicator;
