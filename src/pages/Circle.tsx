import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Battery,
  BatteryCharging,
  Gauge,
  MapPin,
  RefreshCw,
  UsersRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import Map, { Marker, useMap } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const Circle = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [mapViewport, setMapViewport] = useState<Viewport>({
    latitude: 0,
    longitude: 0,
  });

  const refresh = () => {
    invoke("get_circle_details", { circleId: params.circleId }).then((circle) =>
      setCircle(circle as Circle)
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
              <Item variant={"outline"} size={"sm"} key={index}>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary">
                      {member.firstName.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {member.firstName} {member.lastName}
                  </ItemTitle>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex items-center gap-2 w-15">
                      {member.location.charge === "0" ? (
                        <Battery className="text-green-400 size-4" />
                      ) : (
                        <BatteryCharging className="text-green-400 size-4" />
                      )}

                      <p>{member.location.battery}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-primary size-4" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p>
                            {member.location.name
                              ? member.location.name
                              : `${member.location.address1}, ${member.location.address2}`}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          {`${member.location.address1}, ${member.location.address2}`}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {member.location.speed > 0 && (
                      <div className="flex items-center gap-2">
                        <Gauge className="text-primary size-4" />
                        <p>{(member.location.speed * 2.25).toFixed(2)} mph</p>
                      </div>
                    )}
                  </div>
                </ItemContent>
              </Item>
            ))}
          </CardContent>
        </Card>
        <Map
          {...mapViewport}
          onMove={(evt) => setMapViewport(evt.viewState)}
          style={{ width: "100%", borderRadius: 16, flexGrow: 1 }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
            import.meta.env.VITE_MAP_TILER_KEY
          }`}
        >
          {circle?.members?.map((member, index) => (
            <Marker
              longitude={parseFloat(member.location.longitude)}
              latitude={parseFloat(member.location.latitude)}
              key={index}
              anchor="bottom"
            >
              <Avatar className="outline-3 outline-white size-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-primary">
                  {member.firstName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default Circle;
