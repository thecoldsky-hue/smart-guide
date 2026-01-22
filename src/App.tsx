import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageCircle, ChevronDown, CheckCircle2, 
  Stethoscope, HeartPulse, Activity, Zap, 
  ClipboardList, Search, Sparkles, FileText, MapPin, Shield,
  Clock, Scan, Heart, Move, Brain, Thermometer, Info, Send,
  ShoppingBag
} from 'lucide-react';

// --- 상수 ---
const CLINIC_NAME = "365송도경희한의원";
const CLINIC_INFO = {
  phone: '032-721-8575',
  kakao: 'https://pf.kakao.com/_VqlXK',
  address: '인천 연수구 센트럴로 상가동 250호',
  lastUpdated: '2026.01.23'
};

const DOCTOR_PHILOSOPHY = "통증은 '원인과 재발 요인'을 줄여야 반복이 멈춥니다.";

const TRUST_METRICS = [
  { label: '누적 내원', value: '15,000명+' },
  { label: '누적 치료', value: '200,000건+' },
  { label: '하루 평균', value: '140명 내원' }
];

const WHY_CONTENT = {
  intro: "통증은 보통 한 가지 원인으로 생기지 않습니다.",
  detail: "임상적으로는 근육·근막 과긴장(guarding), 국소 염증 반응, 가동성 제한(관절/연부조직), 신경계 과민화(통증 민감도 상승)가 함께 작용하면서 증상이 유지되는 경우가 많습니다.",
  principle: "그래서 저희는 \"통증만 잠깐 줄이는 것\"이 아니라, 지금 통증을 유지시키는 핵심 요소가 무엇인지를 먼저 구분하고 치료를 조합합니다.",
  factors: [
    { label: "긴장", desc: "근육·근막 과긴장", icon: Activity },
    { label: "염증", desc: "국소 염증 반응", icon: HeartPulse },
    { label: "가동성", desc: "관절/연부조직 제한", icon: Move },
    { label: "신경", desc: "신경계 과민화", icon: Brain }
  ]
};

const CHUNA_SHOCKWAVE = {
  title: "왜 '추나 + 체외충격파'를 먼저 고려하나요?",
  targets: ['허리', '목', '어깨', '팔꿈치', '무릎', '족저근막염'],
  highlightTargets: ['어깨', '팔꿈치'],
  points: [
    { step: 1, title: "체외충격파 (집중형·방사형 혼합)", desc: "깊은 통증점/근막 긴장/회복이 더딘 연부조직에 회복 반응을 유도합니다." },
    { step: 2, title: "추나요법", desc: "가동성·정렬·움직임 패턴을 교정하여 \"뭉침이 다시 생기는 반복 자극\"을 줄입니다." }
  ],
  summary: "\"깊은 긴장/통증점을 먼저 정리(충격파) → 움직임의 원인을 조정(추나)\" 순서가 필요한 환자군이 꽤 많습니다.",
  note: "* 상태에 따라 순서와 조합은 조정됩니다."
};

const SHOCKWAVE_INDICATIONS = {
  highlight: "어깨(회전근개·석회성 건염) 통증은 체외충격파가 자주 활용되는 대표 적응증 중 하나입니다.",
  detail: "어깨 주변 연부조직의 통증점·근막 긴장·회복 지연이 있을 때, 통증 반응을 줄이고 회복 반응을 유도하는 목적으로 사용됩니다.",
  list: [
    "어깨 석회성 건염 / 회전근개 주변 통증",
    "테니스 엘보 / 골프 엘보",
    "족저근막염",
    "아킬레스건/종아리 부착부 통증",
    "무릎 슬개건 주위 통증",
    "고관절 대전자부 통증(외측 엉덩이)",
    "허리·둔부 근막통증/트리거포인트"
  ]
};

const EXAMINATION = {
  intro: "검사는 \"더 많이 하기 위해서\"가 아니라, 치료 방향을 정확히 잡고 불필요한 치료를 줄이기 위한 참고자료입니다.",
  summary: "상태에 따라 체열 · 맥진기 · 뇌파 · BWA 등을 선별해 활용합니다.",
  items: [
    { icon: Thermometer, name: "체열검사", purpose: "체표 온도 분포로 염증/순환/긴장 패턴의 단서를 확인합니다." },
    { icon: Heart, name: "맥진기 검사", purpose: "맥파·리듬 분석으로 자율신경 반응과 회복력의 단서를 봅니다." },
    { icon: Brain, name: "뇌파검사", purpose: "수면·스트레스 상태에서 나타나는 신경계 과각성(긴장) 단서를 참고합니다." },
    { icon: Scan, name: "BWA(체성분)", purpose: "체성분/수분 지표로 부종 경향·근육량·회복력을 확인합니다." }
  ],
  note: "이 결과는 \"진단의 전부\"가 아니라, 진찰/촉진/운동평가와 함께 치료 계획을 세우는 보조 자료로 사용합니다."
};

const TREATMENT_STEPS = [
  { id: 1, title: '접수 · 문진표', desc: '환자분의 현재 상태와 병력을 상세히 기록합니다.', icon: ClipboardList },
  { id: 2, title: '원장 진료', desc: '근육, 관절 가동범위를 체크하고 통증의 원인을 찾습니다.', icon: Stethoscope },
  { id: 3, title: '필요 시 검사', desc: '치료 방향을 정확히 잡기 위한 선별 검사를 시행합니다.', icon: Search },
  { id: 4, title: '맞춤 치료', desc: '상태에 맞는 조합 치료를 설명 후 진행합니다.', icon: Sparkles }
];

const THERAPIES = [
  {
    id: 'acupuncture',
    title: '침 치료',
    icon: Activity,
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    why: '통증이 오래가면 몸이 보호 반응으로 근육을 더 조여 통증-긴장 악순환이 생깁니다. 침 자극은 이 과긴장을 완화하고, 통증 신호를 조절하는 신경계 반응을 유도합니다.',
    what: '경혈/통증점에 자극을 주어 근육 긴장 완화 + 통증 민감도 조절을 목표로 합니다.',
    how: '상태에 따라 부위·강도·빈도를 조절하며, 급성기에는 간격이 짧아질 수 있습니다.'
  },
  {
    id: 'pharmacopuncture',
    title: '약침',
    icon: HeartPulse,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    why: '통증 부위에 염증 반응이 강하거나 특정 통증점이 뚜렷한 경우, 단순 침 자극만으로는 회복이 더딜 수 있습니다. 약침은 국소 부위에 집중적으로 자극/약물을 전달해 회복을 돕습니다.',
    what: '한약 성분을 정제한 약액을 경혈/통증점에 소량 주입하여 통증·염증 반응 완화를 목표로 합니다.',
    how: '종류/용량/부위에 따라 비용이 달라질 수 있어, 시행 전 안내 후 진행합니다.'
  },
  {
    id: 'chuna',
    title: '추나',
    icon: Move,
    color: 'bg-violet-50 text-violet-700 border-violet-100',
    why: '통증이 반복되는 이유가 "뭉침"만이 아니라, 가동성 저하나 정렬/움직임 패턴 문제인 경우가 많습니다. 추나는 관절·연부조직의 움직임을 회복시켜 반복 자극을 줄입니다.',
    what: '관절/근육의 움직임 제한을 평가한 뒤, 상태에 맞게 가동성 회복과 부담 감소를 목표로 합니다.',
    how: '통증 반응을 보며 강도를 조절하고, 필요 시 다른 치료와 병행합니다.'
  },
  {
    id: 'shockwave',
    title: '체외충격파',
    icon: Zap,
    color: 'bg-amber-50 text-amber-700 border-amber-100',
    why: '깊은 근막 긴장이나 통증점(트리거포인트), 연부조직의 회복 지연이 있을 때, 손으로 풀기 어려운 경우가 있습니다. 체외충격파는 해당 부위에 물리적 자극을 주어 회복 반응을 유도합니다.',
    what: '집중형(정밀, 깊은 부위)과 방사형(넓은 범위)을 상태에 따라 혼합해 적용할 수 있습니다.',
    how: '부위/깊이/민감도에 따라 방식과 강도를 조절합니다.'
  }
];

const OPTIONS = [
  {
    id: 'chuna-shock',
    title: '추나 + 체외충격파',
    when: '움직임 제한 + 깊은 통증점/근막 긴장이 함께 있을 때',
    targets: ['허리', '목', '어깨', '팔꿈치', '무릎', '족저근막염'],
    highlightTargets: ['어깨', '팔꿈치'],
    price: '1회 3.5만원',
    note: '집중형·방사형 혼합 사용 (고정가)',
    insurance: '실비 청구는 가입 상품/조건에 따라 달라질 수 있어요. 필요 시 확인을 도와드립니다.'
  },
  {
    id: 'insurance-herb',
    title: '건강보험 첩약',
    subtitle: '비용 부담이 비교적 적은 선택지',
    when: '비용 부담을 줄이면서 10일 단위로 경과를 보며 조정하고 싶을 때',
    chips: ['소화불량', '알레르기 비염', '생리통', '허리디스크'],
    price: '10일 기준 본인부담 약 3~4만원대',
    note: '기준/개인 상태에 따라 달라질 수 있습니다',
    insurance: '실비 청구는 가입 상품/조건에 따라 달라질 수 있어요. 필요 시 확인을 도와드립니다.',
    highlight: true
  },
  {
    id: 'diet',
    title: '다이어트 프로그램',
    when: '체중·체형 관리가 필요하고 루틴을 잡고 싶은 경우',
    price: '35만 / 54만 / 99만',
    note: '탕약형(1달/3달) 또는 환형(린다이어트 12주) + 복부관리/순환관리 포함',
    subnote: '상세 구성은 가격표에서 확인'
  },
  {
    id: 'gongjin',
    title: '공진단',
    when: '만성 피로/회복력 저하/중요 일정 전후 컨디션 관리가 필요할 때',
    price: '10환 20만~68만원',
    note: '녹용/사향/원방 선택 가능'
  }
];

const FAQ_DATA = [
  { q: "초진은 얼마나 걸리나요?", a: "보통 50~60분 소요됩니다. 꼼꼼한 진료와 충분한 치료 시간을 위해 여유 있게 방문해 주세요." },
  { q: "비용은 언제 정해지나요?", a: "진료 후 치료 계획이 정해지면 비용을 안내드립니다. 보험 적용 항목과 비급여 항목이 구분됩니다." },
  { q: "실비(실손) 청구 가능한가요?", a: "네, 가능합니다. 침, 추나, 건강보험 첩약 등 급여 항목은 대부분 청구 가능합니다." },
  { q: "침을 매일 맞아도 괜찮나요?", a: "네, 급성기에는 매일 치료가 효과적입니다. 상태에 따라 치료 간격을 조절합니다." },
  { q: "사혈 후 샤워/목욕은 어떻게 하나요?", a: "간단한 샤워는 1시간 이후부터 가능합니다. 탕에 들어가는 목욕(목욕탕/사우나)은 다음날부터 권장합니다." }
];

// 카테고리 순서 고정 (기타/외용 탭이 반드시 보이도록)
const PRICE_CATEGORIES = ['치료/시술', '다이어트', '한약 클리닉', '보약/제품', '기타/외용'];

// 가격표
const PRICE_LIST = {
  '치료/시술': [
    { name: '추나+체외충격파', price: '3.5만원', unit: '1회', note: '집중형/방사형 혼합 · 고정가 · 실비O(조건확인)' },
    { name: '건강보험 첩약', price: '3~4만원대', unit: '10일분', note: '질환별 상이 · 실비O(조건확인)' },
    { name: '무통약침', price: '5천원', unit: '1회', note: '' },
    { name: '태반/DiNA 약침', price: '각 1.5만원', unit: '1회', note: '' },
  ],
  '다이어트': [
    { name: '다이어트 패키지 A', price: '35만', unit: '1달', note: '탕약 1달 + 스컬프 1회 + 저주파 1회' },
    { name: '다이어트 패키지 B', price: '54만', unit: '12주', note: '린다이어트(환) 12주 + 스컬프 1회 + 저주파 5회' },
    { name: '다이어트 패키지(3개월)', price: '99만', unit: '3달', note: '탕약 3달 + 스컬프 3회 + 라포스 2회 + 저주파 1회' },
    { name: '지방분해약침(라인약침)', price: '3.3만 / 23.1만', unit: '1vial(2cc) / 10vial(20cc)', note: '복부/팔뚝 등 · VAT 포함 · 용량옵션 상담' },
    { name: '바디스컬프', price: '4.4만', unit: '1회(30분)', note: '복부 고정 · 자기장(코어스컬프 동일기전)' },
    { name: '라포스센스', price: '3.3만', unit: '1회(20분)', note: '팔/허벅지 · 레이저+고주파+저주파' },
    { name: '바디스컬프 4회+라포스 4회', price: '27.5만', unit: '패키지', note: 'VAT 포함' },
    { name: '복부 리프팅', price: '30만', unit: '1회', note: '온다 10KJ + 리니어펌' },
    { name: '3개월 + 비포/애프터 동의', price: '추가 제공', unit: '-', note: '바디스컬프 1회 + 라포스센스 1회 추가' },
  ],
  '한약 클리닉': [
    { name: '치료한약(성인)', price: '40만', unit: '1달', note: '' },
    { name: '치료한약(성인)', price: '72만', unit: '2달', note: '10% 할인' },
    { name: '치료한약(성인)', price: '102만', unit: '3달', note: '15% 할인' },
    { name: '녹용한약(성인)', price: '60만', unit: '1달', note: '' },
    { name: '녹용한약(성인)', price: '108만', unit: '2달', note: '10% 할인' },
    { name: '녹용한약(성인)', price: '153만', unit: '3달', note: '15% 할인' },
    { name: '치료한약(소아)', price: '28만', unit: '1달', note: '만 8세 미만' },
    { name: '녹용한약(소아)', price: '32만', unit: '20kg↓', note: '' },
    { name: '녹용한약(소아)', price: '35만', unit: '20~30kg', note: '' },
    { name: '녹용한약(소아)', price: '38만', unit: '30kg↑', note: '' },
  ],
  '보약/제품': [
    { name: '원방공진단', price: '68만 / 195만', unit: '10환 / 30환', note: '' },
    { name: '사향공진단', price: '45만 / 129만', unit: '10환 / 30환', note: '' },
    { name: '녹용공진단', price: '20만 / 57만', unit: '10환 / 30환', note: '' },
    { name: '총명공진단', price: '22만원', unit: '30포', note: '' },
    { name: '경옥고', price: '17.5만원', unit: '30포', note: '' },
    { name: '녹용경옥고', price: '19.5만원', unit: '30포', note: '' },
    { name: '우황청심원', price: '3.5만 / 7.5만', unit: '1환', note: '변방 / 원방' },
    { name: '평심액(불면치료)', price: '2.5만', unit: '10포', note: '' },
    { name: '워터젤리', price: '7만', unit: '20포', note: '' },
  ],
  '기타/외용': [
    { name: '맛있는쌍화탕', price: '9.9만', unit: '30팩', note: '' },
    { name: '소화환', price: '8천', unit: '1통', note: '' },
    { name: '변비환', price: '8천', unit: '1통', note: '' },
    { name: '술대장(숙취해소)', price: '6천', unit: '2포', note: '' },
    { name: '파스(부착형)', price: '5천', unit: '1개', note: '' },
    { name: '시프겔파스(롤링타입)', price: '8천', unit: '1개', note: '' },
    { name: '산삼파스(롤링타입)', price: '1.5만', unit: '1개', note: '' },
    { name: '수면안대', price: '1천', unit: '1개', note: '' },
  ],
};

// --- 컴포넌트 ---

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
        <div className="font-bold text-slate-800 tracking-tight">{CLINIC_NAME}</div>
        <a href={`tel:${CLINIC_INFO.phone}`} className="text-slate-500 text-sm flex items-center gap-1 font-medium">
          <Phone size={14} />
          {CLINIC_INFO.phone}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const scrollToWhy = () => {
    document.getElementById('why-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToPrices = () => {
    document.getElementById('prices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-slate-900 text-white relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="relative px-6 pt-10 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 mb-5">
          <Clock size={14} className="text-blue-300" />
          <span className="text-blue-200 text-sm font-medium tracking-tight">처음 오셨나요? 60초 안내</span>
        </div>

        <h1 className="text-[26px] font-extrabold leading-tight mb-6 text-white drop-shadow-sm tracking-tight">
          통증은 <span className="text-blue-400">'원인과 재발 요인'</span>을<br/>
          줄여야 반복이 멈춥니다.
        </h1>

        <p className="text-slate-300 text-[15px] leading-relaxed mb-8 tracking-tight font-normal">
          오늘 진행 순서와 치료 이유를 먼저 설명드리고,<br/>
          비용은 최신 가격표로 투명하게 안내합니다.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <p className="text-white font-bold text-base tracking-tight">{metric.value}</p>
              <p className="text-slate-400 text-xs mt-1 tracking-tight">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button 
            onClick={scrollToWhy}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl shadow-lg shadow-white/10 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform tracking-tight"
          >
            <Shield size={18} className="text-blue-600" />
            왜 치료가 필요한가요?
          </button>

          <button 
            onClick={scrollToPrices}
            className="w-full bg-slate-800 text-white font-semibold py-3.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform tracking-tight"
          >
            <FileText size={16} />
            비급여 가격표 보기
          </button>
        </div>
      </div>

      <div className="absolute right-[-50px] top-[-50px] w-48 h-48 bg-blue-500 rounded-full opacity-10 blur-3xl" />
    </section>
  );
}

function WhySection() {
  return (
    <section id="why-section" className="px-5 py-10 bg-white">
      <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2 tracking-tight">
        <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
        왜 치료가 필요한가요?
      </h2>

      <p className="text-slate-800 text-[15px] leading-relaxed mb-2 font-medium tracking-tight">{WHY_CONTENT.intro}</p>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 tracking-tight">{WHY_CONTENT.detail}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {WHY_CONTENT.factors.map((factor, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <factor.icon size={16} className="text-slate-700" />
              <span className="font-bold text-slate-800 text-sm tracking-tight">{factor.label}</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed tracking-tight">{factor.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed tracking-tight">{WHY_CONTENT.principle}</p>
    </section>
  );
}

function ChunaShockwaveSection() {
  const [showIndications, setShowIndications] = useState(false);

  return (
    <section className="px-5 py-10 bg-blue-50">
      <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 tracking-tight">
        <Zap size={20} className="text-amber-500" />
        {CHUNA_SHOCKWAVE.title}
      </h2>

      <div className="mb-5">
        <p className="text-slate-600 text-sm mb-2 font-medium tracking-tight">대표 적용 부위</p>
        <div className="flex flex-wrap gap-2">
          {CHUNA_SHOCKWAVE.targets.map((target) => {
            const isHighlight = CHUNA_SHOCKWAVE.highlightTargets.includes(target);
            return (
              <span 
                key={target} 
                className={`px-3 py-1.5 rounded-full text-sm font-medium border tracking-tight ${
                  isHighlight
                    ? 'bg-amber-100 text-amber-800 border-amber-200' 
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {target}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 mb-5">
        {CHUNA_SHOCKWAVE.points.map((point) => (
          <div key={point.step} className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {point.step}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 tracking-tight">{point.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed tracking-tight">{point.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
        <p className="text-amber-800 text-sm font-medium mb-1 tracking-tight">⭐ {SHOCKWAVE_INDICATIONS.highlight}</p>
        <p className="text-amber-700 text-xs leading-relaxed tracking-tight">{SHOCKWAVE_INDICATIONS.detail}</p>
      </div>

      <button 
        onClick={() => setShowIndications(!showIndications)}
        className="text-slate-600 text-sm flex items-center gap-1 mb-3 tracking-tight"
      >
        <ChevronDown size={16} className={`transition-transform ${showIndications ? 'rotate-180' : ''}`} />
        체외충격파가 자주 활용되는 경우 {showIndications ? '접기' : '보기'}
      </button>

      {showIndications && (
        <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
          <ul className="space-y-2">
            {SHOCKWAVE_INDICATIONS.list.map((item, idx) => (
              <li key={idx} className="text-slate-600 text-sm flex items-start gap-2 tracking-tight">
                <span className="text-blue-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-slate-400 text-xs mt-3 tracking-tight">* 상태에 따라 적용 여부가 달라질 수 있습니다.</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 border border-blue-200">
        <p className="text-slate-700 text-sm leading-relaxed mb-2 tracking-tight">📌 {CHUNA_SHOCKWAVE.summary}</p>
        <p className="text-slate-500 text-xs tracking-tight">{CHUNA_SHOCKWAVE.note}</p>
      </div>
    </section>
  );
}

function ExaminationSection() {
  return (
    <section className="px-5 py-10 bg-white">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
        <Search size={20} className="text-slate-700" />
        검사는 무엇을 보기 위해 하나요?
      </h2>

      <p className="text-slate-600 text-sm leading-relaxed mb-3 tracking-tight">{EXAMINATION.intro}</p>
      <p className="text-slate-500 text-sm mb-5 tracking-tight">{EXAMINATION.summary}</p>

      <div className="space-y-3 mb-5">
        {EXAMINATION.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-slate-600" />
            </div>
            <div>
              <p className="font-medium text-slate-800 text-sm tracking-tight">{item.name}</p>
              <p className="text-slate-500 text-xs mt-0.5 tracking-tight">{item.purpose}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-slate-500 text-xs leading-relaxed mb-4 tracking-tight">{EXAMINATION.note}</p>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start mb-4">
        <Send className="text-blue-600 shrink-0 mt-0.5" size={16} />
        <div>
          <p className="text-sm text-slate-700 font-medium tracking-tight">검사 결과는 카카오톡으로 공유해드립니다.</p>
          <p className="text-xs text-slate-500 mt-1 tracking-tight">체성분(BWA) 결과는 앱에서도 확인 가능합니다 (가능한 경우 안내)</p>
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3 items-start">
        <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-slate-700 tracking-tight">검사는 상태에 따라 선별하며, <span className="font-medium">불필요한 검사는 진행하지 않습니다.</span></p>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="px-5 py-10 bg-slate-50">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
        <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
        오늘의 진료 과정
      </h2>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" />
        <div className="space-y-5">
          {TREATMENT_STEPS.map((step) => (
            <div key={step.id} className="relative flex gap-4 items-start">
              <div className="relative z-10 w-12 h-12 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                <step.icon size={20} className="text-slate-700" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-900 rounded-full text-white text-xs flex items-center justify-center font-bold">
                  {step.id}
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-slate-800 mb-1 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed tracking-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
        <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-slate-700 tracking-tight">치료는 <span className="font-medium">설명 후 동의하에 진행</span>하며, 비용은 최신 가격표로 투명하게 안내드립니다.</p>
      </div>
    </section>
  );
}

function TherapyCard({ therapy, isOpen, onClick }) {
  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-slate-300 shadow-md' : 'border-slate-100'}`}>
      <button onClick={onClick} className="w-full p-5 text-left">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${therapy.color}`}>
            <therapy.icon size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 tracking-tight">{therapy.title}</h3>
            <p className="text-slate-400 text-xs mt-0.5 tracking-tight">탭하여 자세히 보기</p>
          </div>
          <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 space-y-3">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs font-bold text-blue-700 mb-2 tracking-tight">WHY 왜 필요한가요?</p>
            <p className="text-slate-600 text-sm leading-relaxed tracking-tight">{therapy.why}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-xs font-bold text-emerald-700 mb-2 tracking-tight">WHAT 무엇을 하나요?</p>
            <p className="text-slate-600 text-sm leading-relaxed tracking-tight">{therapy.what}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-xs font-bold text-amber-700 mb-2 tracking-tight">HOW 어떻게 진행하나요?</p>
            <p className="text-slate-600 text-sm leading-relaxed tracking-tight">{therapy.how}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TherapiesSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="px-5 py-10 bg-white">
      <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2 tracking-tight">
        <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
        치료별 상세 안내
      </h2>
      <p className="text-slate-500 text-sm mb-6 tracking-tight">각 치료가 필요한 이유와 방법을 설명드립니다</p>

      <div className="space-y-3">
        {THERAPIES.map((therapy) => (
          <TherapyCard
            key={therapy.id}
            therapy={therapy}
            isOpen={openId === therapy.id}
            onClick={() => setOpenId(openId === therapy.id ? null : therapy.id)}
          />
        ))}
      </div>
    </section>
  );
}

function OptionsSection() {
  return (
    <section className="px-5 py-10 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 tracking-tight">
          <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
          선택 옵션
        </h2>
        <p className="text-slate-500 text-sm mt-1 tracking-tight">상태에 따라 도움이 되는 경우에만 안내드립니다</p>
      </div>

      <div className="space-y-4">
        {OPTIONS.map((opt) => (
          <div 
            key={opt.id} 
            className={`rounded-2xl p-5 border shadow-sm ${
              opt.highlight 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-slate-100'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800 text-lg tracking-tight">{opt.title}</h3>
              <span className={`font-bold text-sm ${opt.highlight ? 'text-blue-600' : 'text-slate-700'}`}>{opt.price}</span>
            </div>

            {opt.subtitle && (
              <p className="text-blue-600 text-sm font-medium mb-2 tracking-tight">{opt.subtitle}</p>
            )}

            {/* 칩 표시 */}
            {(opt.chips || (Array.isArray(opt.targets) && opt.targets.length > 0)) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {(opt.chips || opt.targets).map((chip) => {
                  const isHighlight = opt.highlightTargets?.includes(chip);
                  return (
                    <span 
                      key={chip} 
                      className={`px-2.5 py-1 text-xs rounded-full font-medium border tracking-tight ${
                        opt.highlight 
                          ? 'bg-white border-blue-200 text-blue-700'
                          : isHighlight
                            ? 'bg-amber-100 border-amber-200 text-amber-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
            )}

            <p className="text-slate-500 text-sm mb-2 tracking-tight">
              <span className="text-slate-700 font-medium">이럴 때:</span> {opt.when}
            </p>

            <p className="text-slate-400 text-xs tracking-tight">{opt.note}</p>

            {opt.subnote && (
              <p className="text-slate-400 text-xs mt-1 tracking-tight">{opt.subnote}</p>
            )}

            {opt.insurance && (
              <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2 items-start">
                <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-blue-600 text-xs tracking-tight">{opt.insurance}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-5 py-10 bg-white">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
        <span className="w-1.5 h-6 bg-slate-900 rounded-full" />
        자주 묻는 질문
      </h2>

      <div className="space-y-3">
        {FAQ_DATA.map((item, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-slate-700 text-sm pr-4 tracking-tight">{item.q}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-4 pb-4">
                <div className="pt-3 border-t border-slate-200 text-sm text-slate-600 leading-relaxed tracking-tight">{item.a}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PriceSection() {
  const [activeCategory, setActiveCategory] = useState('치료/시술');

  return (
    <section id="prices-section" className="px-5 py-10 bg-slate-50">
      <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2 tracking-tight">
        <FileText size={20} className="text-slate-700" />
        전체 비급여 가격표
      </h2>
      <p className="text-slate-400 text-xs mb-6 tracking-tight">최종 업데이트: {CLINIC_INFO.lastUpdated}</p>

      {/* 카테고리 탭 (5등분 고정 그리드 + 모던 스타일) */}
      <div className="grid grid-cols-5 gap-1 mb-6 px-1">
        {PRICE_CATEGORIES.filter(cat => PRICE_LIST[cat]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-2.5 rounded-lg text-[11px] font-bold tracking-tight break-keep leading-tight transition-all flex items-center justify-center text-center h-full ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 안전 문구 */}
      <div className="mb-6 p-4 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-100 leading-relaxed tracking-tight">
        ※ 환자분의 상태에 따라 보험 적용 여부와 비용이 달라질 수 있습니다. 진료 시 상세히 안내드립니다.
      </div>

      {/* 가격 리스트 */}
      <div className="space-y-3">
        {PRICE_LIST[activeCategory]?.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start p-4 bg-white rounded-xl border border-slate-100">
            <div className="flex-1 pr-4">
              <p className="font-medium text-slate-800 tracking-tight">{item.name}</p>
              <p className="text-xs text-slate-400 mt-0.5 tracking-tight">{item.unit}</p>
              {item.note && (
                <p className="text-[11px] leading-snug text-slate-500 mt-1.5 tracking-tight">{item.note}</p>
              )}
            </div>
            <p className="font-bold text-slate-900 text-right shrink-0 tracking-tight">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 py-8 bg-slate-800 text-white pb-28">
      <div className="text-center space-y-3">
        <p className="font-bold text-lg tracking-tight">{CLINIC_NAME}</p>
        <div className="flex items-center justify-center gap-1 text-slate-400 text-sm">
          <MapPin size={14} />
          <span className="tracking-tight">{CLINIC_INFO.address}</span>
        </div>
        <p className="text-slate-400 text-sm tracking-tight">{CLINIC_INFO.phone}</p>
      </div>
      <div className="mt-6 pt-6 border-t border-slate-700 text-center text-xs text-slate-500 tracking-tight">
        © 2025 {CLINIC_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

function BottomBar() {
  const scrollToPrices = () => {
    document.getElementById('prices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 pb-6">
      <div className="max-w-md mx-auto flex gap-3">
        <button 
          onClick={scrollToPrices}
          className="flex-1 bg-white border-2 border-slate-300 text-slate-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform tracking-tight"
        >
          <FileText size={18} />
          가격표
        </button>
        <a 
          href={CLINIC_INFO.kakao}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] bg-[#FEE500] text-[#191919] font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform tracking-tight"
        >
          <MessageCircle size={20} />
          카카오로 상담하기
        </a>
      </div>
    </div>
  );
}

// --- 메인 앱 ---
export default function SmartGuideV13() {
  useEffect(() => {
    // Pretendard 폰트 강제 주입 (Head에 Link 태그 추가)
    const link = document.createElement('link');
    link.href = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto shadow-2xl relative font-sans text-slate-900">
      <style>{`
        /* 전역 폰트 설정 (중요!) */
        body {
          font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
                  }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(59, 130, 246, 0.2); color: inherit; }
      `}</style>

      <Header />
      <Hero />
      <WhySection />
      <ChunaShockwaveSection />
      <ExaminationSection />
      <JourneySection />
      <TherapiesSection />
      <OptionsSection />
      <FAQ />
      <PriceSection />
      <Footer />
      <BottomBar />
    </div>
  );
}