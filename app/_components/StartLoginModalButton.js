'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function StartLoginModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (!isPending) setIsOpen(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setIsPending(true);
      await signIn('google', { callbackUrl: '/exam' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-8 py-4 bg-sky-600 text-white font-bold text-lg rounded-full hover:bg-sky-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 inline-flex items-center shadow-lg shadow-sky-200"
      >
        모의시험 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-bold text-slate-900">로그인 후 시작</h2>
              <button
                type="button"
                onClick={closeModal}
                disabled={isPending}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-5 text-sm text-slate-600">
              학습 기록 저장과 오답 분석을 위해 구글 로그인이 필요합니다.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base font-black text-sky-700">G</span>
              {isPending ? '이동 중...' : 'Google로 계속하기'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
