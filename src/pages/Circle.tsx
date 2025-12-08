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

const Circle = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [circle, setCircle] = useState<Circle | null>(null);

  useEffect(() => {
    invoke("get_circle_details", { circleId: params.circleId }).then((circle) =>
      setCircle(circle as Circle)
    );
  }, []);

  return (
    <div className="p-5">
      <Button variant={"ghost"} className="mb-2" onClick={() => navigate("/")}>
        <ArrowLeft />
        Back
      </Button>

      <h1
        className="font-extrabold text-3xl mb-6"
        style={{
          color: `#${circle?.color}`,
        }}
      >
        {circle?.name}
      </h1>

      <Card>
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <UsersRound className="size-4" />
            Members ({circle?.memberCount})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {circle?.members?.map((member) => (
            <Item variant={"outline"} size={"sm"}>
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
                  {member.location.speed > 0 && (
                    <div className="flex items-center gap-2 w-15">
                      <Gauge className="text-primary size-4" />
                      <p>{member.location.speed.toFixed(2)}</p>
                    </div>
                  )}
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
                </div>
              </ItemContent>
            </Item>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Circle;
