document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const TOTAL_IMAGES = 450;
    const BASE_URL = 'http://nails.laiot.cloud/';

    // --- i18n (Internationalization) ---
    const translations = {
        en: {
            nav_faq: "FAQ",
            lang_switcher: "中文",
            main_title: "Chrome Nails: Your Inspiration Drawer",
            main_subtitle: "Select how many styles you'd like to discover, and let serendipity guide you.",
            draw_button: "Get Inspired",
            save_button: "Save Inspiration",
            video_title: "How to Get Perfect Chrome Nails",
            faq_title: "Frequently Asked Questions",
            faq_q1_q: "What are chrome nails?",
            faq_q1_a: "Chrome nails are a type of manicure that uses a special powder to create a reflective, mirror-like finish. It's applied over a gel base and top coat to achieve its signature high-shine, metallic look.",
            faq_q2_q: "How long do chrome manicures last?",
            faq_q2_a: "With proper application and care, a chrome gel manicure can last for two to three weeks without chipping. The longevity is similar to a standard gel manicure.",
            faq_q3_q: "Can I do Hailey Bieber's glazed donut nails at home?",
            faq_q3_a: "Yes! The 'glazed donut' look is a variation of chrome nails, typically using a pearlescent white chrome powder over a sheer nude or pink base. Many at-home kits are available to achieve this trendy look.",
            footer_text: "A project designed for nail art lovers and inspiration seekers.",
            loading: "Drawing...",
            saved: "Saved!",
            download: "Download Image",
        },
        zh: {
            nav_faq: "常见问题",
            lang_switcher: "English",
            main_title: "铬感美甲：你的灵感抽取器",
            main_subtitle: "选择您想发现的样式数量，让不期而遇的灵感引导您。",
            draw_button: "获取灵感",
            save_button: "保存灵感",
            video_title: "如何打造完美的铬感美甲",
            faq_title: "常见问题解答",
            faq_q1_q: "什么是铬感美甲？",
            faq_q1_a: "铬感美甲是一种使用特殊粉末创造出镜面反射效果的美甲。它通常涂在凝胶底层和顶层之上，以实现其标志性的高光泽金属外观。",
            faq_q2_q: "铬感美甲能持续多久？",
            faq_q2_a: "如果涂抹得当并加以护理，铬感凝胶美甲可以持续两到三周不掉色。其持久性与标准的凝胶美甲相似。",
            faq_q3_q: "我可以在家做海莉·比伯的'釉面甜甜圈'美甲吗？",
            faq_q3_a: "是的！“釉面甜甜圈”造型是铬感美甲的一种变体，通常在透明的裸色或粉色底色上使用珠光白色铬粉。市面上有许多家用套装可以实现这种潮流造型。",
            footer_text: "一个为美甲爱好者和灵感探索者设计的项目。",
            loading: "抽取中...",
            saved: "已保存！",
            download: "下载图片",
        }
    };
    
    let currentLang = localStorage.getItem('nail-art-lab-lang') || 'en';

    const langSwitcher = document.getElementById('lang-switcher');
    const langText = document.getElementById('lang-text');

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('nail-art-lab-lang', lang);
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        langText.textContent = translations[lang].lang_switcher;
    }

    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        switchLanguage(newLang);
    });

    // --- Core Functionality ---
    const drawButton = document.getElementById('draw-button');
    const saveButton = document.getElementById('save-button');
    const imageResults = document.getElementById('image-results');
    
    drawButton.addEventListener('click', handleDraw);
    saveButton.addEventListener('click', handleSave);

    function handleDraw() {
        const count = document.querySelector('input[name="draw-count"]:checked').value;
        const drawnIndexes = new Set();
        
        imageResults.innerHTML = `<p class="col-span-full text-gray-500">${translations[currentLang].loading}</p>`;
        saveButton.classList.add('hidden');

        while (drawnIndexes.size < count) {
            const randomIndex = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
            drawnIndexes.add(randomIndex);
        }
        
        setTimeout(() => {
            imageResults.innerHTML = '';
            const gridColsClass = {
                '1': 'lg:grid-cols-1',
                '3': 'lg:grid-cols-3',
                '5': 'lg:grid-cols-5'
            };
            imageResults.className = `mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridColsClass[count]} gap-6 min-h-[100px]`;

            drawnIndexes.forEach(index => {
                const imageUrl = `${BASE_URL}${index}.jpg`;
                const container = document.createElement('div');
                container.className = 'relative group aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 drawn-image';
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Chrome nail art style #${index}`;
                img.className = 'w-full h-full object-cover object-center';
                img.loading = 'lazy';

                const downloadLink = document.createElement('a');
                downloadLink.href = imageUrl;
                downloadLink.download = `nail_inspiration_${index}.jpg`;
                downloadLink.className = 'absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer';
                downloadLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`;
                downloadLink.setAttribute('title', translations[currentLang].download);

                container.appendChild(img);
                container.appendChild(downloadLink);
                imageResults.appendChild(container);
            });
        }, 500);
    }

    function handleSave() {
        const imagesToSave = [];
        imageResults.querySelectorAll('img').forEach(img => {
            imagesToSave.push(img.src);
        });

        if (imagesToSave.length > 0) {
            localStorage.setItem('saved-nail-inspirations', JSON.stringify(imagesToSave));
            saveButton.textContent = translations[currentLang].saved;
        }
    }

    // --- Initial Load ---
    switchLanguage(currentLang);
});
