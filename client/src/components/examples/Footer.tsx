import Footer from '../Footer'

export default function FooterExample() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">페이지 콘텐츠</h1>
        <p className="text-muted-foreground mt-4">이 영역에 메인 콘텐츠가 들어갑니다.</p>
      </div>
      <Footer />
    </div>
  );
}