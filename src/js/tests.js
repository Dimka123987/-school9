/**
 * Tests Module
 * Управление тестами и задачами на платформе
 */

let currentTask = null;
let currentHintIndex = 0;
let compiler = null;

/**
 * Загрузить все тесты
 */
async function loadTests() {
    try {
        const response = await fetch('src/data/tests.json');
        const tests = await response.json();
        
        compiler = new CodeCompiler();
        displayTests(tests);
    } catch (error) {
        console.error('Ошибка загрузки тестов:', error);
        document.getElementById('testsGrid').innerHTML = 
            '<p style="color: red;">Ошибка загрузки тестов</p>';
    }
}

/**
 * Отобразить карточки тестов
 */
function displayTests(tests) {
    const grid = document.getElementById('testsGrid');
    grid.innerHTML = '';

    tests.forEach(test => {
        const card = document.createElement('div');
        card.className = 'test-card';
        card.innerHTML = `
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <span class="difficulty ${test.difficulty}">${getDifficultyLabel(test.difficulty)}</span>
            <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 10px;">
                ${test.tasks.length} ${test.tasks.length === 1 ? 'задача' : 'задач'}
            </p>
        `;
        
        // Клик на карточку показывает задачи
        card.addEventListener('click', () => showTestTasks(test));
        
        grid.appendChild(card);
    });
}

/**
 * Показать задачи теста
 */
async function showTestTasks(test) {
    // Если в тесте одна задача, открыть её сразу
    if (test.tasks.length === 1) {
        openTask(test.tasks[0]);
    } else {
        // Иначе показать список задач
        showTaskList(test);
    }
}

/**
 * Показать список задач в модальном окне
 */
function showTaskList(test) {
    const modal = document.getElementById('taskModal');
    modal.classList.add('active');
    
    document.getElementById('taskTitle').textContent = test.title;
    document.getElementById('taskDescription').textContent = test.description;
    
    let tasksHTML = '<div style="display: grid; gap: 15px;">';
    test.tasks.forEach((task, index) => {
        tasksHTML += `
            <div style="background: var(--card-bg); padding: 15px; border-radius: 8px; cursor: pointer; border: 2px solid var(--border-color);"
                 onclick="openTask(${JSON.stringify(task).replace(/"/g, '&quot;')})">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <small style="color: var(--text-secondary);">Нажмите для открытия →</small>
            </div>
        `;
    });
    tasksHTML += '</div>';
    
    document.getElementById('taskInstructions').innerHTML = tasksHTML;
    document.getElementById('hintSection').style.display = 'none';
    document.getElementById('comparisonDiv').style.display = 'none';
}

/**
 * Открыть задачу для решения
 */
function openTask(task) {
    currentTask = task;
    currentHintIndex = 0;

    document.getElementById('taskTitle').textContent = task.title;
    document.getElementById('taskDescription').textContent = task.description;
    document.getElementById('taskInstructions').textContent = task.description;
    document.getElementById('codeInput').value = task.template || '';
    document.getElementById('output').textContent = 'Результат появится здесь...';
    document.getElementById('hintSection').style.display = 'none';
    document.getElementById('comparisonDiv').style.display = 'none';
    document.getElementById('validationResult').innerHTML = '';

    const modal = document.getElementById('taskModal');
    modal.classList.add('active');
}

/**
 * Закрыть модальное окно
 */
function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    currentTask = null;
    currentHintIndex = 0;
}

/**
 * Скомпилировать код
 */
async function compileCode() {
    if (!currentTask || !compiler) return;

    const code = document.getElementById('codeInput').value;
    
    // Сначала проверить синтаксис
    const validation = compiler.validateSyntax(code);
    
    let validationHTML = '';
    
    if (!validation.valid) {
        validationHTML += '<div class="validation-result validation-error">';
        validationHTML += '<strong>❌ Ошибки синтаксиса:</strong><ul>';
        validation.errors.forEach(err => {
            validationHTML += `<li>${err}</li>`;
        });
        validationHTML += '</ul></div>';
    }
    
    if (validation.warnings.length > 0) {
        validationHTML += '<div class="validation-result validation-warning">';
        validationHTML += '<strong>⚠️ Предупреждения:</strong><ul>';
        validation.warnings.forEach(warn => {
            validationHTML += `<li>${warn}</li>`;
        });
        validationHTML += '</ul></div>';
    }

    document.getElementById('validationResult').innerHTML = validationHTML;

    if (!validation.valid) {
        document.getElementById('output').textContent = 'Исправьте ошибки синтаксиса перед компиляцией';
        return;
    }

    // Показать процесс компиляции
    const output = document.getElementById('output');
    const btn = document.getElementById('compileBtn');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Компилируется...';
    btn.disabled = true;

    try {
        const result = await compiler.compile(code);
        
        if (result.success) {
            output.textContent = '✅ Код успешно скомпилирован!\n\nТеперь нажмите "Выполнить" для запуска.';
        } else {
            output.textContent = '❌ Ошибка компиляции:\n\n' + result.stderr;
        }
    } catch (error) {
        output.textContent = '❌ Ошибка: ' + error.message;
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

/**
 * Выполнить код
 */
async function runCode() {
    if (!currentTask || !compiler) return;

    const code = document.getElementById('codeInput').value;
    
    // Проверить синтаксис
    const validation = compiler.validateSyntax(code);
    if (!validation.valid) {
        document.getElementById('output').textContent = 'Исправьте ошибки синтаксиса';
        return;
    }

    const output = document.getElementById('output');
    const btn = document.getElementById('runBtn');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Выполняется...';
    btn.disabled = true;

    try {
        const result = await compiler.run(code);
        
        if (result.success) {
            output.textContent = result.output || '(нет вывода)';
            
            // Сравнить с ожидаемым результатом
            if (currentTask.expectedOutput) {
                const comparison = compiler.compareOutput(result.output, currentTask.expectedOutput);
                displayComparison(comparison);
            }
        } else {
            output.textContent = '❌ Ошибка выполнения:\n\n' + result.error;
        }
    } catch (error) {
        output.textContent = '❌ Ошибка: ' + error.message;
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

/**
 * Показать сравнение результатов
 */
function displayComparison(comparison) {
    const div = document.getElementById('comparisonDiv');
    div.style.display = 'block';
    
    document.getElementById('actualOutput').textContent = comparison.actual;
    document.getElementById('expectedOutput').textContent = comparison.expected;
    
    let resultHTML = `<div class="validation-result `;
    if (comparison.passed) {
        resultHTML += `validation-success">✅ ${comparison.match}</div>`;
    } else {
        resultHTML += `validation-error">❌ ${comparison.match}</div>`;
    }
    
    document.getElementById('comparisonResult').innerHTML = resultHTML;
}

/**
 * Показать решение
 */
function showSolution() {
    if (!currentTask) return;

    const code = currentTask.solution || 'Решение недоступно';
    document.getElementById('codeInput').value = code;
    document.getElementById('output').textContent = '💡 Решение загружено. Нажмите "Выполнить" для проверки.';
}

/**
 * Показать первую подсказку
 */
function showHint() {
    if (!currentTask || !currentTask.hints) return;

    const hintSection = document.getElementById('hintSection');
    hintSection.style.display = 'block';
    currentHintIndex = 0;
    displayHint();
}

/**
 * Показать следующую подсказку
 */
function getNextHint() {
    if (!currentTask || !currentTask.hints) return;

    currentHintIndex++;
    if (currentHintIndex >= currentTask.hints.length) {
        document.getElementById('hintText').textContent = 'Подсказки закончились. Посмотрите решение!';
        document.querySelector('#hintSection button').disabled = true;
    } else {
        displayHint();
    }
}

/**
 * Отобразить подсказку
 */
function displayHint() {
    if (!currentTask || !currentTask.hints) return;

    const hint = currentTask.hints[currentHintIndex] || 'Подсказка недоступна';
    document.getElementById('hintText').textContent = hint;
}

/**
 * Сбросить код к шаблону
 */
function resetCode() {
    if (!currentTask) return;

    document.getElementById('codeInput').value = currentTask.template || '';
    document.getElementById('output').textContent = 'Результат появится здесь...';
    document.getElementById('validationResult').innerHTML = '';
    document.getElementById('comparisonDiv').style.display = 'none';
    document.getElementById('hintSection').style.display = 'none';
}

/**
 * Получить метку сложности
 */
function getDifficultyLabel(difficulty) {
    const labels = {
        'beginner': '🟢 Начинающий',
        'intermediate': '🟡 Средний',
        'advanced': '🔴 Продвинутый'
    };
    return labels[difficulty] || difficulty;
}

// Закрытие модала при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeTaskModal();
    }
});

// Горячая клавиша ESC для закрытия модала
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTaskModal();
    }
});
