"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, MapPin, ShieldCheck, UserPlus } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleInputChange = (field: keyof LoginFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors: LoginFormErrors = {};

    if (!formValues.email.trim()) {
      nextErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "올바른 이메일 형식으로 입력해주세요.";
    }

    if (!formValues.password.trim()) {
      nextErrors.password = "비밀번호를 입력해주세요.";
    } else if (formValues.password.length < 6) {
      nextErrors.password = "비밀번호는 6자 이상 입력해주세요.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    console.log(isSignupMode ? "회원가입 데이터:" : "로그인 데이터:", formValues);

    alert(
      isSignupMode
        ? "현재는 더미 UI 단계입니다. 회원가입 데이터는 콘솔에서 확인해주세요."
        : "현재는 더미 UI 단계입니다. 로그인 데이터는 콘솔에서 확인해주세요.",
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto grid w-full max-w-[1200px] gap-6 px-5 py-6 md:grid-cols-[0.95fr_1.05fr] md:px-6 md:py-10 lg:gap-10">
        <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-8 md:flex md:min-h-[620px] md:flex-col md:justify-between md:px-8 md:py-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F6843] transition hover:text-[#333333]"
            >
              <ArrowLeft size={18} />
              홈으로 돌아가기
            </Link>

            <div className="mt-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
                <MapPin size={14} />
                Near Market
              </div>

              <h1 className="mt-5 text-[32px] leading-[40px] font-bold tracking-[-0.04em] text-[#333333] md:text-[46px] md:leading-[56px]">
                우리 동네 거래를
                <br />더 편하게 관리해요
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#66715F] md:text-base md:leading-7">
                로그인 후 상품 등록, 관심 상품, 내 판매글 관리 기능을 사용할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:mt-0">
            <div className="rounded-2xl bg-white/80 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B8A58] text-white">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#333333]">로그인 상태에 따른 UI 제어</p>
                  <p className="mt-1 text-xs text-[#777777]">
                    본인 상품만 수정/삭제 가능하도록 확장 예정
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1E3] text-[#D7772F]">
                  <UserPlus size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#333333]">Supabase Auth 연동 예정</p>
                  <p className="mt-1 text-xs text-[#777777]">
                    이메일 로그인과 프로필 테이블 연결 예정
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-8">
          <div>
            <p className="text-sm font-semibold text-[#6B8A58]">
              {isSignupMode ? "Create Account" : "Welcome Back"}
            </p>

            <h2 className="mt-2 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[34px] md:leading-[44px]">
              {isSignupMode ? "회원가입" : "로그인"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#777777]">
              {isSignupMode
                ? "이메일과 비밀번호로 새 계정을 생성합니다."
                : "이메일과 비밀번호를 입력해 로그인합니다."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#333333]">
                이메일
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleInputChange("email", event.target.value)}
                  placeholder="near-market@example.com"
                  className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 pl-11 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                />

                <Mail
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-[#6B8A58]"
                />
              </div>

              {errors.email && <p className="mt-2 text-sm text-[#E5484D]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#333333]">
                비밀번호
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={formValues.password}
                  onChange={(event) => handleInputChange("password", event.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  className="h-12 w-full rounded-xl border border-[#E6E6E6] bg-white px-4 pr-11 pl-11 text-sm outline-none placeholder:text-[#AAAAAA] focus:border-[#6B8A58]"
                />

                <Lock
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-[#6B8A58]"
                />

                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#777777] transition hover:bg-[#FAFAF8]"
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && <p className="mt-2 text-sm text-[#E5484D]">{errors.password}</p>}
            </div>

            {!isSignupMode && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#777777]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#D5D5D5] accent-[#6B8A58]"
                  />
                  로그인 유지
                </label>

                <button type="button" className="text-sm font-semibold text-[#4F6843]">
                  비밀번호 찾기
                </button>
              </div>
            )}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#6B8A58] text-sm font-semibold text-white transition hover:bg-[#4F6843]"
            >
              {isSignupMode ? "회원가입하기" : "로그인하기"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-4">
            <p className="text-sm font-semibold text-[#333333]">테스트 안내</p>

            <p className="mt-2 text-sm leading-6 text-[#777777]">
              현재는 Supabase Auth 연결 전이라 실제 로그인은 되지 않습니다. 입력값 검증과 화면
              흐름만 확인할 수 있습니다.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <span className="text-[#777777]">
              {isSignupMode ? "이미 계정이 있으신가요?" : "아직 계정이 없나요?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsSignupMode((prev) => !prev);
                setErrors({});
              }}
              className="font-semibold text-[#4F6843]"
            >
              {isSignupMode ? "로그인" : "회원가입"}
            </button>
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
