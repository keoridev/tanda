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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="mb-8 shadow-lg border border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-gray-900">Управление графиком</CardTitle>
        <CardDescription className="text-base">
          Настройте отображение данных и выберите период анализа
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Тип графика */}
        <div className="space-y-4">
          <Label htmlFor="chart-type" className="text-base font-medium text-gray-700">Тип графика</Label>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={(value) => {
              if (value) actions.setChartType(value as "line" | "bar" | "area");
            }}
            className="grid grid-cols-3 gap-3"
          >
            {chartTypeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="flex flex-col h-20 p-3 data-[state=on]:bg-[#0c7d70] data-[state=on]:text-white hover:bg-[#0c7d70]/10 transition-all"
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <span className="text-sm font-medium">{option.label}</span>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>

        <Separator />

        {/* Представление данных */}
        <div className="space-y-4">
          <Label htmlFor="view-mode" className="text-base font-medium text-gray-700">Представление данных</Label>
          <Select
            value={viewMode}
            onValueChange={(value) =>
              actions.setViewMode(value as "absolute" | "growth")
            }
          >
            <SelectTrigger id="view-mode" className="w-full h-12 text-base">
              <SelectValue placeholder="Выберите представление" />
            </SelectTrigger>
            <SelectContent>
              {viewModeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-base">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Период времени */}
        <div className="space-y-4">
          <Label className="text-base font-medium text-gray-700">Временной период</Label>
          <div className="grid grid-cols-3 gap-4">
            {timeRangeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={timeRange === option.value ? "default" : "outline"}
                  className={`flex flex-col h-24 p-4 transition-all hover:scale-105 ${
                    timeRange === option.value 
                      ? 'bg-[#0c7d70] hover:bg-[#0a6b5f] text-white' 
                      : 'hover:bg-[#0c7d70]/5 hover:border-[#0c7d70]/30'
                  }`}
                  onClick={() => actions.setTimeRange(option.value as any)}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-semibold">{option.label}</span>
                  <span className="text-xs opacity-80">
                    {option.description}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Действия с данными */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="space-y-1">
            <Label className="text-base font-medium text-gray-900">Экспорт данных</Label>
            <p className="text-sm text-gray-600">
              Скачайте данные в различных форматах
            </p>
          </div>
          <Button variant="outline" size="default" className="gap-2 hover:bg-[#0c7d70] hover:text-white hover:border-[#0c7d70]">
            <Download className="w-5 h-5" />
            Экспорт
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
};
