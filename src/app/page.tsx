export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 py-10 text-[var(--color-text-primary)]">
      <section className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-[var(--color-surface)] p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-[var(--color-primary)]">Near Market</p>
          <h1 className="mt-2 text-3xl font-bold">동네에서 만나는 중고거래</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            지역과 카테고리를 기준으로 가까운 상품을 탐색하는 중고거래 포트폴리오 프로젝트입니다.
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--color-primary-light)] p-4 text-sm text-[var(--color-primary-dark)]">
          현재 프로젝트 초기 세팅을 진행 중입니다.
        </div>

        <button className="rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white">
          상품 둘러보기
        </button>
      </section>
    </main>
  );
}
