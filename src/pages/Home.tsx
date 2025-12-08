import CircleCard from "@/components/circle-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { invoke } from "@tauri-apps/api/core";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [circles, setCircles] = useState<Circles | null>(null);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    invoke("get_circles")
      .then((circles) => setCircles(circles as Circles))
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
        {circles &&
          circles.circles.map((circle) => (
            <CircleCard circle={circle} key={circle.id} onClick={() => navigate(`/circle/${circle.id}`)} />
          ))}
      </div>
    </div>
  );
};

export default Home;
