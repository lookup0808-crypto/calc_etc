import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface InputFieldProps {
  label: string;
  value: number | "";
  onChange: (value: number | "") => void;
  type?: "number" | "currency" | "percentage";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

function InputField({ 
  label, 
  value, 
  onChange, 
  type = "number", 
  placeholder, 
  min, 
  max, 
  step = 1 
}: InputFieldProps & { value: number | ""; onChange: (value: number | "") => void }) {
  // 입력값이 빈 문자열이면 onChange("") 전달, 아니면 숫자 전달
  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange("");
    } else {
      const displayValue = parseFloat(raw);
      if (type === "percentage") {
        onChange(isNaN(displayValue) ? "" : displayValue / 100);
      } else {
        onChange(isNaN(displayValue) ? "" : displayValue);
      }
    }
  };

  const getDisplayValue = () => {
    if (value === "") return "";
    if (type === "percentage") {
      return value * 100;
    }
    return value;
  };

  const getSuffix = () => {
    switch (type) {
      case "currency": return "원";
      case "percentage": return "%";
      default: return "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.replace(/\s/g, '')} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label.replace(/\s/g, '')}
          type="number"
          value={getDisplayValue()}
          onChange={handleDisplayChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="pr-8"
          data-testid={`input-${label.replace(/\s/g, '').toLowerCase()}`}
        />
        {getSuffix() && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
            {getSuffix()}
          </span>
        )}
      </div>
    </div>
  );
}

interface InputFormProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function InputForm({ title, children, className = "" }: InputFormProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4" data-testid="form-title">
          {title}
        </h3>
        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export { InputForm, InputField };