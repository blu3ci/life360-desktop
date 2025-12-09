import React from "react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Gauge,
  MapPin,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props extends React.ComponentProps<"div"> {
  member: Member;
}

const BatteryIcon = ({ battery, className }: { battery: number, className: string }) => {
  if (battery >= 90) {
    return <BatteryFull className={className + " text-green-400"} />;
  } else if (battery >= 50) {
    return <BatteryMedium className={className + " text-green-400"} />;
  } else if (battery >= 20) {
    return <BatteryLow className={className + " text-orange-400"} />;
  } else {
    return <BatteryWarning className={className + " text-red-400"} />;
  }
};

const PersonItem = ({ member, ...props }: Props) => {
  return (
    <Item variant={"outline"} size={"sm"} {...props}>
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
              <BatteryIcon battery={parseInt(member.location.battery)} className="size-4" />
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
  );
};

export default PersonItem;
