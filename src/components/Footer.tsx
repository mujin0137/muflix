import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-black py-16 px-4 md:px-16 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-6 mb-8">
          <Facebook className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
          <Instagram className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
          <Youtube className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col gap-3">
            <span className="hover:underline cursor-pointer">화면 해설</span>
            <span className="hover:underline cursor-pointer">고객 센터</span>
            <span className="hover:underline cursor-pointer">기프트카드</span>
            <span className="hover:underline cursor-pointer">미디어 센터</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="hover:underline cursor-pointer">투자 정보</span>
            <span className="hover:underline cursor-pointer">입사 정보</span>
            <span className="hover:underline cursor-pointer">이용 약관</span>
            <span className="hover:underline cursor-pointer">개인정보 처리방침</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="hover:underline cursor-pointer">쿠키 설정</span>
            <span className="hover:underline cursor-pointer">회사 정보</span>
            <span className="hover:underline cursor-pointer">문의하기</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="hover:underline cursor-pointer">법적 고지</span>
            <span className="hover:underline cursor-pointer">오직 MUFLIX에서</span>
          </div>
        </div>

        {/* Service Code Button */}
        <button className="border border-gray-400 px-4 py-1 hover:text-white mb-6 text-sm">
          서비스 코드
        </button>

        {/* Copyright */}
        <div className="space-y-4 text-xs">
           <p>© 2025 MUFLIX, Inc.</p>
           <p>
             넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2025-서울종로-0000호 전화번호: 00-000-0000 (수신자 부담) <br/>
             대표: 홍길동 | 이메일 주소: korea@muflix.com | 주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161 <br/>
             사업자등록번호: 000-00-00000 | 클라우드 호스팅: Amazon Web Services Inc. <br/>
           </p>
        </div>
      </div>
    </footer>
  );
};
