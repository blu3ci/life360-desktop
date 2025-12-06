import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Circle {
  name: String;
}

const circles: Circle[] = [
  {
    name: "Madadi Family",
  },
  {
    name: "WHAT THE HECK",
  },
];

const Home = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-extrabold text-primary text-start mb-5">
        My Circles
      </h1>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {circles.map((circle) => (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-2xl font-bold truncate">
                {circle.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center grow">
              <Avatar className="h-full w-auto aspect-square text-4xl">
                <AvatarFallback className="bg-primary">
                  {circle.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
