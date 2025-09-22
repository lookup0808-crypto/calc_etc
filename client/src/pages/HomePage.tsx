import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, Target, DollarSign } from "lucide-react";
import FireSimPage from "./FireSimPage";
import ETFSimPage from "./ETFSimPage";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground" data-testid="app-title">
                FIRE Calculator
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="hero-title">
            경제적 자유를 위한 계산기
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="hero-description">
            FIRE(Financial Independence, Retire Early) 목표 달성 시점을 계산하고 
            ETF 투자 시뮬레이션으로 투자 전략을 계획해보세요.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">FIRE 시뮬레이션</h3>
              <p className="text-sm text-muted-foreground">
                현재 소득과 저축률을 바탕으로 경제적 자유 달성 시점을 예측합니다
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">ETF 투자 계산</h3>
              <p className="text-sm text-muted-foreground">
                다양한 ETF 투자 옵션과 복리 효과를 통한 자산 성장을 시뮬레이션합니다
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">시각적 분석</h3>
              <p className="text-sm text-muted-foreground">
                직관적인 차트로 자산 성장 과정을 시각화하여 이해를 돕습니다
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="fire" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6" data-testid="main-tabs">
            <TabsTrigger value="fire" data-testid="tab-fire">
              FIRE 시뮬레이션
            </TabsTrigger>
            <TabsTrigger value="etf" data-testid="tab-etf">
              ETF 투자 계산
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fire" className="space-y-6">
            <FireSimPage />
          </TabsContent>
          
          <TabsContent value="etf" className="space-y-6">
            <ETFSimPage />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}