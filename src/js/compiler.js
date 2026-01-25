/**
 * Code Compiler Module
 * Интеграция с онлайн-компилятором для тестирования C++ кода
 */

class CodeCompiler {
    constructor() {
        this.compilerId = 'wandbox';  // wandbox.org - бесплатный онлайн компилятор
        this.compileUrl = 'https://wandbox.org/api/compile';
    }

    /**
     * Отправить код на компиляцию
     * @param {string} code - C++ код
     * @returns {Promise<Object>} - результат компиляции
     */
    async compile(code) {
        try {
            const response = await fetch(this.compileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    compiler: 'gcc-head',  // GCC последней версии
                    options: '-std=c++17 -Wall',
                    stdin: ''
                })
            });

            const result = await response.json();
            return this.parseResult(result);
        } catch (error) {
            return {
                success: false,
                error: 'Ошибка подключения к компилятору: ' + error.message,
                output: '',
                stderr: ''
            };
        }
    }

    /**
     * Парсинг результата компиляции
     * @param {Object} result - результат от wandbox
     * @returns {Object} - обработанный результат
     */
    parseResult(result) {
        return {
            success: !result.compiler_error && !result.runtime_error,
            output: result.output || '',
            stderr: result.compiler_error || result.runtime_error || '',
            compilationTime: result.compiler_message || '',
            error: result.compiler_error || result.runtime_error || null
        };
    }

    /**
     * Быстрая проверка синтаксиса без компиляции
     * @param {string} code - C++ код
     * @returns {Object} - результат проверки
     */
    validateSyntax(code) {
        const errors = [];

        // Базовые проверки синтаксиса
        if (!code.includes('main()') && !code.includes('main (')) {
            errors.push('⚠️ Не найдена функция main()');
        }

        if (!code.includes('#include')) {
            errors.push('⚠️ Нет #include директив');
        }

        if (code.includes('cout') && !code.includes('#include <iostream>')) {
            errors.push('❌ Используется cout но не подключен <iostream>');
        }

        if (code.includes('vector') && !code.includes('#include <vector>')) {
            errors.push('❌ Используется vector но не подключен <vector>');
        }

        // Проверка скобок
        const braces = this.countBraces(code);
        if (braces.curly.open !== braces.curly.close) {
            errors.push(`❌ Неправильное количество фигурных скобок: { = ${braces.curly.open}, } = ${braces.curly.close}`);
        }
        if (braces.round.open !== braces.round.close) {
            errors.push(`❌ Неправильное количество круглых скобок: ( = ${braces.round.open}, ) = ${braces.round.close}`);
        }

        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: this.getWarnings(code)
        };
    }

    /**
     * Подсчет скобок
     * @param {string} code - C++ код
     * @returns {Object} - количество скобок
     */
    countBraces(code) {
        return {
            curly: {
                open: (code.match(/\{/g) || []).length,
                close: (code.match(/\}/g) || []).length
            },
            round: {
                open: (code.match(/\(/g) || []).length,
                close: (code.match(/\)/g) || []).length
            }
        };
    }

    /**
     * Получить предупреждения
     * @param {string} code - C++ код
     * @returns {Array} - список предупреждений
     */
    getWarnings(code) {
        const warnings = [];

        if (!code.includes('return 0;') && code.includes('int main')) {
            warnings.push('⚠️ main() должна возвращать 0');
        }

        if (code.includes('using namespace std;')) {
            warnings.push('💡 Совет: избегайте "using namespace std;" в больших проектах');
        }

        if (!code.includes('endl') && code.includes('cout')) {
            warnings.push('💡 Совет: добавьте endl после вывода для новой строки');
        }

        return warnings;
    }

    /**
     * Выполнить код с вводом
     * @param {string} code - C++ код
     * @param {string} stdin - входные данные
     * @returns {Promise<Object>} - результат выполнения
     */
    async run(code, stdin = '') {
        try {
            const response = await fetch(this.compileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    compiler: 'gcc-head',
                    options: '-std=c++17',
                    stdin: stdin
                })
            });

            const result = await response.json();
            return {
                success: !result.runtime_error && !result.compiler_error,
                output: result.output || '',
                error: result.runtime_error || result.compiler_error || null
            };
        } catch (error) {
            return {
                success: false,
                output: '',
                error: 'Ошибка выполнения: ' + error.message
            };
        }
    }

    /**
     * Сравнить вывод с ожидаемым результатом
     * @param {string} actualOutput - полученный вывод
     * @param {string} expectedOutput - ожидаемый вывод
     * @returns {Object} - результат сравнения
     */
    compareOutput(actualOutput, expectedOutput) {
        const actual = actualOutput.trim();
        const expected = expectedOutput.trim();

        return {
            passed: actual === expected,
            actual: actual,
            expected: expected,
            match: actual === expected ? '✅ Верно!' : '❌ Неверный вывод'
        };
    }

    /**
     * Получить подсказку для задачи
     * @param {Array<string>} hints - массив подсказок
     * @param {number} hintIndex - индекс подсказки
     * @returns {string} - подсказка
     */
    getHint(hints, hintIndex = 0) {
        if (hintIndex >= hints.length) {
            return 'Подсказки закончились. Посмотрите решение.';
        }
        return hints[hintIndex];
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeCompiler;
}
