import {
  Download,
  BarChart3,
  LineChart as LineChartIcon,
  History,
  TrendingUp,
  Calendar,
  PieChart,
  AreaChart,
} from "lucide-react";
import { useProfessionStore } from "~entities/profession";
import { Button } from "~app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~app/components/ui/select";
import { Label } from "~app/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~app/components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~app/components/ui/card";
import { Separator } from "~app/components/ui/separator";

export const ControlPanel = () => {
  const { viewMode, chartType, timeRange, actions } = useProfessionStore();

  const timeRangeOptions = [
    {
      value: "historical",
      label: "История",
      icon: History,
      description: "2010-2024",
    },
    {
      value: "forecast",
      label: "Прогноз",
      icon: TrendingUp,
      description: "2025-2029",
    },
    {
      value: "all",
      label: "Всё время",
      icon: Calendar,
      description: "2010-2029",
    },
  ];

  const chartTypeOptions = [
    { value: "line", label: "Линии", icon: LineChartIcon },
    { value: "bar", label: "Столбцы", icon: BarChart3 },
    { value: "area", label: "Области", icon: AreaChart },
  ];

  const viewModeOptions = [
    { value: "absolute", label: "Абсолютные значения" },
    { value: "growth", label: "Рост в %" },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Управление графиком</CardTitle>
        <CardDescription>
          Настройте отображение данных и выберите период анализа
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Тип графика */}
        <div className="space-y-3">
          <Label htmlFor="chart-type">Тип графика</Label>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={(value) => {
              if (value) actions.setChartType(value as "line" | "bar" | "area");
            }}
            className="grid grid-cols-3 gap-2"
          >
            {chartTypeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="flex flex-col h-16 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{option.label}</span>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>

        <Separator />

        {/* Представление данных */}
        <div className="space-y-3">
          <Label htmlFor="view-mode">Представление данных</Label>
          <Select
            value={viewMode}
            onValueChange={(value) =>
              actions.setViewMode(value as "absolute" | "growth")
            }
          >
            <SelectTrigger id="view-mode" className="w-full">
              <SelectValue placeholder="Выберите представление" />
            </SelectTrigger>
            <SelectContent>
              {viewModeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Период времени */}
        <div className="space-y-3">
          <Label>Временной период</Label>
          <div className="grid grid-cols-3 gap-3">
            {timeRangeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={timeRange === option.value ? "default" : "outline"}
                  className="flex flex-col h-21 p-2 transition-all hover:scale-105"
                  onClick={() => actions.setTimeRange(option.value as any)}
                >
                  <Icon className="w-5 h-5 " />
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground ">
                    {option.description}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Действия с данными */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Экспорт данных</Label>
            <p className="text-sm text-muted-foreground">
              Скачайте данные в различных форматах
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Экспорт
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
