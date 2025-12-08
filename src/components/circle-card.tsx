import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { twMerge } from "tailwind-merge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props extends React.ComponentProps<"div"> {
  circle: Circle;
}

const CircleCard = ({ circle, className, ...props }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card
          className={twMerge(
            `h-50 w-full sm:w-auto sm:aspect-square overflow-clip hover:outline-4 transition-all duration-75`,
            className
          )}
          style={{
            outlineColor: `#${circle.color}`
          }}
          {...props}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold truncate">
              {circle.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center grow">
            <Avatar className="h-full w-auto aspect-square text-4xl">
              <AvatarFallback className="bg-primary capitalize">
                {circle.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit mt-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary capitalize">
              {circle.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{circle.name}</h4>
            <p className="text-sm">Members: {circle.memberCount}</p>
            <div className="text-muted-foreground text-xs">
              Created{" "}
              {new Date(parseInt(circle.createdAt) * 1000).toLocaleString(
                undefined,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CircleCard;
