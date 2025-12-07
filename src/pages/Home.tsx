import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoke } from "@tauri-apps/api/core";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

// interface Circle {
//   name: String;
// }

// const circles: Circle[] = [
//   {
//     name: "Madadi Family",
//   },
//   {
//     name: "WHAT THE HECK",
//   },
// ];

const Home = () => {
  const [circles, setCircles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    invoke("get_circles")
      .then((circles) => setCircles(circles as string[]))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-extrabold text-primary text-start mb-5">
        My Circles
      </h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error retrieving circles</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap sm:flex-row gap-4">
        {circles.map((circle, index) => (
          <Card  onClick={() => alert(circle)} className="h-50 w-full sm:w-auto sm:aspect-square overflow-clip hover:outline-4 outline-primary transition-all duration-75" key={index}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold truncate">
                {circle}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center grow">
              <Avatar className="h-full w-auto aspect-square text-4xl">
                <AvatarFallback className="bg-primary capitalize">{circle.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
