"use client";

import Clock from "@mui/icons-material/AccessAlarmOutlined";
import { Badge, Card, CardContent, Typography } from "@mui/material";

interface ClassSchedule {
  id: string;
  start_time: string;
  end_time: string;
  instructor: string;
  modalities: {
    name: string;
  };
}

interface TodayScheduleProps {
  classes: ClassSchedule[];
}

export function TodaySchedule({ classes }: TodayScheduleProps) {
  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getModalityColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "jiu-jitsu":
        return "bg-blue-600/20 text-blue-400";
      case "muay thai":
        return "bg-orange-600/20 text-orange-400";
      case "taekwondo":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-foreground"
        >
          Aulas de Hoje
        </Typography>
        <div className="space-y-3">
          {classes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma aula programada para hoje.
            </p>
          ) : (
            classes.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Badge
                      className={getModalityColor(classItem.modalities.name)}
                    >
                      {classItem.modalities.name}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Prof. {classItem.instructor}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {formatTime(classItem.start_time)} -{" "}
                    {formatTime(classItem.end_time)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
