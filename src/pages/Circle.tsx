import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radius, RefreshCw, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import PersonItem from "@/components/person-item";
import PlaceIndicator from "@/components/place-indicator";

const Circle = () => {
  let params = useParams();
  let mapRef = useRef<MapRef>(null);
  const navigate = useNavigate();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [places, setPlaces] = useState<Places | null>(null);

  const refresh = () => {
    invoke("get_circle_details", { circleId: params.circleId }).then((circle) =>
      setCircle(circle as Circle)
    );

    invoke("get_places", { circleId: params.circleId }).then((places) =>
      setPlaces(places as Places)
    );
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    // if (circle) {
    //   setMapViewport({
    //     latitude: parseFloat(circle?.members?.[0].location.latitude ?? "0"),
    //     longitude: parseFloat(circle?.members?.[0].location.longitude ?? "0"),
    //     zoom: 20,
    //   });
    // }
  }, [circle]);

  return (
    <div className="p-5 min-h-screen flex flex-col">
      <Button
        variant={"ghost"}
        className="mb-2 w-fit"
        onClick={() => navigate("/")}
      >
        <ArrowLeft />
        Back
      </Button>
      <div className="flex justify-between">
        <h1
          className="font-extrabold text-3xl mb-6"
          style={{
            color: `#${circle?.color}`,
          }}
        >
          {circle?.name}
        </h1>
        <Button onClick={refresh}>
          <RefreshCw />
          Refresh
        </Button>
      </div>

      <div className="md:static space-y-2 md:space-y-0 grow flex flex-col">
        <Card className="h-fit min-w-80 md:absolute md:m-2 z-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="size-4" />
              Members ({circle?.memberCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {circle?.members?.map((member, index) => (
              <PersonItem
                member={member}
                key={index}
                onClick={() =>
                  // setMapViewport({
                  //   latitude: parseFloat(member.location.latitude),
                  //   longitude: parseFloat(member.location.longitude),
                  //   zoom: 100,
                  // })
                  mapRef.current?.flyTo({
                    center: [
                      parseFloat(member.location.longitude),
                      parseFloat(member.location.latitude),
                    ],
                    duration: 1000,
                    zoom: 20,
                  })
                }
              />
            ))}
          </CardContent>
        </Card>
        <Map
          style={{ width: "100%", borderRadius: 16, flexGrow: 1 }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
            import.meta.env.VITE_MAP_TILER_KEY
          }`}
          ref={mapRef}
        >
          {circle?.members?.map((member, index) => (
            <Marker
              longitude={parseFloat(member.location.longitude)}
              latitude={parseFloat(member.location.latitude)}
              key={index}
              anchor="bottom"
              style={{ zIndex: 10 }}
            >
              <Avatar className="outline-3 outline-white size-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-primary">
                  {member.firstName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Marker>
          ))}
          {places && <PlaceIndicator places={places} />}
          <NavigationControl />
        </Map>
      </div>
    </div>
  );
};

export default Circle;
