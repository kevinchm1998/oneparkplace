// 免責聲明彈出視窗 - 修改版本：按X取消視窗並進入主頁
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 啟動免責聲明功能');
    
    const disclaimerModal = document.getElementById('disclaimerModal');
    const closeBtn = document.querySelector('.disclaimer-close');
    const agreeBtn = document.querySelector('.disclaimer-agree'); // 如 HTML 無可忽略
    
    if (!disclaimerModal) {
        console.error('❌ 找不到免責聲明元素');
        return;
    }
    
    // 顯示免責聲明
    function showDisclaimer() {
        console.log('✅ 顯示免責聲明');
        disclaimerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('disclaimer-scroll-lock');
    }
    
    // 隱藏免責聲明並進入主頁
    function hideDisclaimerAndEnter() {
        console.log('✅ 關閉免責聲明，進入主頁');
        disclaimerModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('disclaimer-scroll-lock');
        
        try {
            localStorage.setItem('disclaimerClosed', 'true');
            console.log('💾 已保存關閉狀態到本地存儲');
        } catch (error) {
            console.error('❌ 保存本地存儲失敗:', error);
        }

        // 🎵 關閉免責後啟動背景音樂（如果已定義）
        if (window.startBackgroundMusic) {
            console.log('🎵 啟動背景音樂');
            window.startBackgroundMusic();
        }
    }
    
    // 檢查是否已經關閉過（暫時仍然每次都會顯示，不根據這個隱藏）
    let hasClosed = false;
    try {
        const stored = localStorage.getItem('disclaimerClosed');
        hasClosed = stored === 'true';
        console.log('📊 本地存儲狀態:', hasClosed);
    } catch (error) {
        console.error('❌ 讀取本地存儲失敗:', error);
        hasClosed = false;
    }
    
    // 關閉按鈕
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            console.log('🖱️ X按鈕被點擊');
            e.preventDefault();
            e.stopPropagation();
            hideDisclaimerAndEnter();
        });
    }
    
    // 如有「同意」按鈕
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 同意按鈕被點擊 - 進入主頁');
            hideDisclaimerAndEnter();
        });
    }
    
    // 點擊背景關閉
    disclaimerModal.addEventListener('click', function(e) {
        if (e.target === disclaimerModal) {
            console.log('🎯 背景被點擊 - 關閉視窗並進入主頁');
            hideDisclaimerAndEnter();
        }
    });
    
    // ESC 鍵關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && disclaimerModal.classList.contains('active')) {
            console.log('⌨️ ESC 鍵被按下 - 關閉視窗並進入主頁');
            hideDisclaimerAndEnter();
        }
    });
    
    // 顯示免責聲明（每次進入都彈）
    console.log('🔄 準備顯示免責聲明');
    setTimeout(showDisclaimer, 1500);
});

// 🍔 漢堡選單功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 啟動漢堡選單功能');
    
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!hamburger || !mobileMenu || !menuOverlay) {
        console.error('❌ 找不到漢堡選單元素');
        return;
    }
    
    console.log('✅ 找到所有漢堡選單元素');
    
    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            console.log('❌ 關閉手機選單');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            console.log('✅ 打開手機選單');
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // 漢堡按鈕
    hamburger.addEventListener('click', function(e) {
        console.log('🖱️ 漢堡按鈕被點擊');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // 遮罩
    menuOverlay.addEventListener('click', function(e) {
        console.log('🎯 疊層被點擊');
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // 手機選單內連結
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // data-modal / # 都視為內部操作 → 關閉選單
            if (href.startsWith('#') || this.classList.contains('mobile-nav-link') || this.hasAttribute('data-modal')) {
                console.log('🔗 內部連結點擊 - 關閉選單');
                toggleMenu();
                // data-modal 的 click 由另一段 JS 處理
            }
        });
    });
    
    // ESC 關閉
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            console.log('⌨️ ESC 鍵 - 關閉手機選單');
            toggleMenu();
        }
    });
    
    console.log('✅ 漢堡選單事件綁定完成');
});

// 強制清理外部頁面垃圾導航
function cleanExternalNavigation() {
    const selectorsToRemove = [
        '#residential-menu',
        '#property-menu',
        '#residential',
        '.toggle-input',
        '.toggle',
        '.arrow',
        '.pmenu',
        '[onclick*="residential"]',
        '[class*="residential"]',
        '[class*="property"][class*="menu"]',
        '#residential-toggle',
        '#property-toggle'
    ];
    
    selectorsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element && element.parentNode) {
                element.remove();
            }
        });
    });
    
    // 特別處理頁頭
    const pageHeader = document.getElementById('page-header');
    if (pageHeader) {
        const children = Array.from(pageHeader.children);
        children.forEach(child => {
            if (child && 
                !child.classList.contains('logo') && 
                !child.classList.contains('hamburger-menu') &&
                child.id !== 'property-logo' &&
                child.id !== 'page-lang') {
                child.remove();
            }
        });
    }
}

// 頁面加載後執行清理
document.addEventListener('DOMContentLoaded', cleanExternalNavigation);
// 持續監控清理（每2秒執行一次）
setInterval(cleanExternalNavigation, 2000);

// 調試功能
window.fixAll = {
    showDisclaimer: function() {
        const modal = document.getElementById('disclaimerModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ 強制顯示免責聲明');
        }
    },
    hideDisclaimer: function() {
        const modal = document.getElementById('disclaimerModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('✅ 隱藏免責聲明');
        }
    },
    resetDisclaimer: function() {
        try {
            localStorage.removeItem('disclaimerClosed');
            console.log('✅ 免責聲明記錄已清除，請刷新頁面');
        } catch (error) {
            console.error('❌ 清除本地存儲失敗:', error);
        }
    },
    cleanNavigation: function() {
        cleanExternalNavigation();
        console.log('✅ 手動執行導航清理');
    },
    fixScroll: function() {
        document.body.style.overflow = '';
        document.body.classList.remove('disclaimer-scroll-lock');
        console.log('✅ 滾動已修復');
    },
    showMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ 強制顯示手機選單');
        }
    },
    hideMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            console.log('✅ 強制隱藏手機選單');
        }
    },
    status: function() {
        const modal = document.getElementById('disclaimerModal');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        console.log('📊 當前狀態:');
        console.log('- 免責聲明顯示:', modal ? modal.classList.contains('active') : '找不到元素');
        console.log('- 手機選單顯示:', mobileMenu ? mobileMenu.classList.contains('active') : '找不到元素');
        console.log('- Body 滾動鎖定:', document.body.classList.contains('disclaimer-scroll-lock'));
        console.log('- Body overflow:', document.body.style.overflow);
        
        try {
            const stored = localStorage.getItem('disclaimerClosed');
            console.log('- 本地存儲狀態:', stored);
        } catch (error) {
            console.log('- 本地存儲狀態: 讀取失敗');
        }
    }
};

console.log('🔧 調試命令已加載');

// 頁面完全加載後的最終檢查
window.addEventListener('load', function() {
    console.log('🎉 頁面完全加載完成');
    
    // 最終清理
    setTimeout(cleanExternalNavigation, 500);
    
    // 確保滾動正常
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 1000);
});

// 音樂 + 首屏狀態 + 背景影片 + 文件彈窗
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const video = document.querySelector('.background-video');

    // 背景影片自動播放（容許失敗）
    if (video) {
        video.play().catch(error => {
            console.log('🎬 視頻自動播放被阻止:', error);
        });
    }
    
    // 滾動檢測：控制 body 是否加上 on-home-page（用來顯示/隱藏音樂鍵）
    function checkScrollPosition() {
        const scrollY = window.scrollY;
        const homePageHeight = window.innerHeight;
        
        if (scrollY < homePageHeight - 100) {
            document.body.classList.add('on-home-page');
        } else {
            document.body.classList.remove('on-home-page');
        }
    }
    
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    checkScrollPosition();

    // 沒有音樂相關元素就不用繼續
    if (!bgMusic || !musicToggle) {
        console.log('🎵 找不到音樂元素，略過音樂控制');
    } else {
        bgMusic.volume = 0.03;
        
        function startMusic() {
            bgMusic.play().then(() => {
                musicToggle.classList.remove('muted');
            }).catch(e => {
                console.log('音樂啟動失敗', e);
            });
        }
        
        function setupMusicControl() {
            musicToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (bgMusic.paused) {
                    bgMusic.play().then(() => {
                        musicToggle.classList.remove('muted');
                    }).catch(e => {
                        console.log('播放失敗', e);
                    });
                } else {
                    bgMusic.pause();
                    musicToggle.classList.add('muted');
                }
            });
        }
        
        setupMusicControl();
        
        // 檢查是否已經關閉過免責聲明 → 已關閉過就自動播音樂
        let hasClosed = false;
        try {
            const stored = localStorage.getItem('disclaimerClosed');
            hasClosed = stored === 'true';
        } catch (error) {
            hasClosed = false;
        }
        
        if (hasClosed) {
            setTimeout(startMusic, 500);
        }
        
        // 提供給免責聲明關閉時調用
        window.startBackgroundMusic = startMusic;
    }

    // ========== 文件列表彈窗 ==========

    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');

    // 文件資料：按需要改 PDF 路徑 / 日期 / 名稱
    const documentData = {
        'sales-brochure': {
            title: '售樓說明書',
            items: [
                { date: '11/11/2025', name: '售樓說明書', pdf: 'pdf/sales-brochure.pdf' }
            ]
        },
        'price-list': {
            title: '價單',
            items: [
                { date: '11/11/2025', name: '價單第1號', pdf: 'pdf/price-list-1.pdf' }
            ]
        },
        'sales-arrangement': {
            title: '銷售安排',
            items: [
                { date: '10/11/2025', name: '銷售安排第1號', pdf: 'pdf/sales-arrangement-1.pdf' }
            ]
        },
        'transaction-record': {
            title: '成交紀錄冊',
            items: [
                { date: '12/11/2025', name: '成交紀錄冊', pdf: 'pdf/transaction-record.pdf' }
            ]
        },
        'deed': {
            title: '公契',
            items: [
                { date: '01/11/2025', name: '大廈公契', pdf: 'pdf/deed.pdf' }
            ]
        },
        'aerial-photos': {
            title: '鳥瞰照片',
            items: [
                { date: '05/11/2025', name: '項目鳥瞰圖', pdf: 'pdf/aerial-photos.pdf' }
            ]
        },
        'tender-documents': {
            title: '招標文件',
            items: [] // 無 PDF → 顯示「即將推出」
        },
        'lottery-results': {
            title: '抽籤結果',
            items: [
                { date: '20/11/2025', name: '首輪抽籤結果', pdf: 'pdf/lottery-results-1.pdf' }
            ]
        }
    };

    function openModal(type) {
        if (!modalOverlay || !modalTitle || !modalBody) return;
        const data = documentData[type];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalBody.innerHTML = '';

        if (!data.items || data.items.length === 0) {
            const comingSoon = document.createElement('div');
            comingSoon.className = 'coming-soon';
            comingSoon.textContent = '即將推出';
            modalBody.appendChild(comingSoon);
        } else {
            data.items.forEach(item => {
                const documentItem = document.createElement('div');
                documentItem.className = 'document-item';
                
                const documentLink = document.createElement('a');
                documentLink.href = item.pdf;
                documentLink.target = '_blank';
                documentLink.className = 'document-link';
                documentLink.textContent = `${item.date} ${item.name}`;
                
                const inquiryBtn = document.createElement('button');
                inquiryBtn.className = 'inquiry-btn';
                inquiryBtn.textContent = '查詢詳情';
                inquiryBtn.onclick = () => {
                    const msg = encodeURIComponent(`你好，我想查詢「${item.name}」的詳情。`);
                    window.open(`https://wa.me/85253435062?text=${msg}`, '_blank');
                };
                
                documentItem.appendChild(documentLink);
                documentItem.appendChild(inquiryBtn);
                modalBody.appendChild(documentItem);
            });
        }

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // 綁定所有帶 data-modal 的按鈕 / 連結
    const modalButtons = document.querySelectorAll('[data-modal]');
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalType = this.getAttribute('data-modal');
            openModal(modalType);
        });
    });
});