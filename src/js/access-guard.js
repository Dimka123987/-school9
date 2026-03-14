/**
 * Access Guard - Проверка доступа пользователя на сайт
 * Должен быть подключен в HEAD раньше других скриптов
 */

(function() {
    'use strict';

    // Если доступ запрещен - закрываем сайт
    if (localStorage.getItem('access_denied') === 'true') {
        localStorage.removeItem('access_denied');
        alert('⛔ Доступ запрещен. Вы не можете использовать этот сайт.');
        window.location.href = 'about:blank';
        return;
    }

    // Проверяем, прошел ли пользователь через страницу приветствия
    if (!localStorage.getItem('user_entered')) {
        window.location.href = 'selfi.html';
        return;
    }

    // Проверяем доступ при попытке вернуться после отказа
    window.addEventListener('storage', function(e) {
        if (e.key === 'access_denied' && e.newValue === 'true') {
            alert('⛔ Доступ запрещен. Вы не можете использовать этот сайт.');
            window.location.href = 'about:blank';
        }
    });
})();
