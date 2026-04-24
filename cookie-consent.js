// Cookie Consent Panel
(function() {
    const COOKIE_NAME = 'get-dmg-consent';
    const COOKIE_EXPIRY_DAYS = 365;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>Pliki Cookies</h3>
                    <p>Używamy plików cookies do poprawy jakości naszego serwisu. Możesz zaakceptować wszystkie lub dostosować ustawienia.</p>
                    <a href="/dokumenty/polityka-prywatnosci.html" target="_blank" class="cookie-link">Polityka Prywatności</a>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Zaakceptuj wszystkie</button>
                    <button id="cookie-manage" class="cookie-btn cookie-btn-secondary">Zarządzaj</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            setCookie(COOKIE_NAME, 'all', COOKIE_EXPIRY_DAYS);
            banner.remove();
            loadAnalytics();
        });

        document.getElementById('cookie-manage').addEventListener('click', function() {
            showCookieManager();
        });
    }

    function showCookieManager() {
        const modal = document.createElement('div');
        modal.id = 'cookie-manager-modal';
        modal.innerHTML = `
            <div class="cookie-manager-content">
                <h3>Zarządzaj plikami Cookies</h3>
                <div class="cookie-categories">
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="cookie-essential" checked disabled>
                            <strong>Niezbędne</strong>
                        </label>
                        <p>Wymagane do funkcjonowania strony.</p>
                    </div>
                    <div class="cookie-category">
                        <label>
                            <input type="checkbox" id="cookie-analytics">
                            <strong>Analityczne</strong>
                        </label>
                        <p>Pomagają nam zrozumieć, jak korzystasz ze strony.</p>
                    </div>
                </div>
                <div class="cookie-manager-buttons">
                    <button id="cookie-save" class="cookie-btn cookie-btn-primary">Zapisz ustawienia</button>
                    <button id="cookie-modal-close" class="cookie-btn cookie-btn-secondary">Anuluj</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cookie-save').addEventListener('click', function() {
            const choices = {
                essential: true,
                analytics: document.getElementById('cookie-analytics').checked
            };
            setCookie(COOKIE_NAME, JSON.stringify(choices), COOKIE_EXPIRY_DAYS);
            modal.remove();
            document.getElementById('cookie-consent-banner').remove();
            if (choices.analytics) loadAnalytics();
        });

        document.getElementById('cookie-modal-close').addEventListener('click', function() {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.remove();
        });
    }

    function loadAnalytics() {
        // Load Google Analytics or other tracking scripts here
        const consent = getCookie(COOKIE_NAME);
        if (consent) {
            const choices = typeof consent === 'string' && consent.startsWith('{')
                ? JSON.parse(consent)
                : { essential: true, analytics: consent === 'all' };

            if (choices.analytics || consent === 'all') {
                // Add Google Analytics or other tracking code here
                console.log('Analytics enabled');
            }
        }
    }

    function init() {
        const consent = getCookie(COOKIE_NAME);
        if (!consent) {
            createCookieBanner();
        } else {
            loadAnalytics();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
