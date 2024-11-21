import React from 'react';
import './App.css'; // CSS를 따로 분리

function App() {
    return (
        <div className="App">
            {/* 헤더 */}
            <header className="header">
                <img src={`${process.env.PUBLIC_URL}/basic_logo.gif`} alt="단국대학교병원 로고" />
            </header>

            {/* 메인 콘텐츠 */}
            <main className="main">
                <div className="button-container">
                    <button
                        className="button"
                        onClick={() => alert('첫 번째 버튼 클릭!')}
                    >
                        진료 예약
                    </button>
                    <button
                        className="button"
                        onClick={() => alert('두 번째 버튼 클릭!')}
                    >
                        진료 일정 안내
                    </button>
                    <button
                        className="button"
                        onClick={() => alert('세 번째 버튼 클릭!')}
                    >
                        병원 시설 안내
                    </button>
                    <button
                        className="button"
                        onClick={() => alert('네 번째 버튼 클릭!')}
                    >
                        예약 조회
                    </button>
                </div>
            </main>

            {/* 푸터 */}
            <footer className="footer">무인 안내 데스크</footer>
        </div>
    );
}

export default App;
