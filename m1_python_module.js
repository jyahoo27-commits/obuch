// ═══════════════════════════════════════════════════════════════════
// MODULE 1 — Python для Data Science (ПОЛНАЯ ВЕРСИЯ ДЛЯ НОВИЧКОВ)
// Замени этот объект в DS_CONTENT.modules[0]
// ═══════════════════════════════════════════════════════════════════

{
  id: 'm1',
  title: 'Python для Data Science',
  subtitle: 'С абсолютного нуля — до уверенного кода',
  icon: '🐍',
  color: '#3b82f6',
  estimatedDays: 7,
  lessons: [

    // ─────────────────────────────────────────────
    // УРОК 1 — Первые шаги: переменные и типы данных
    // ─────────────────────────────────────────────
    {
      id: 'm1l1',
      title: 'Переменные, типы данных и первый код',
      subtitle: 'Понимаем, как Python "думает" — с нуля',
      readTime: 20,
      xp: 60,
      content: `
<div class="lesson-intro">
  <p class="lead">Этот урок — для тех, кто ни разу не писал код. Никакой воды и умных слов. Только то, что нужно, с объяснением <em>зачем</em> это вообще существует.</p>
</div>

<h2>🤔 Что такое программа простыми словами</h2>
<p>Представь, что ты пишешь пошаговую инструкцию повару. Шаг 1 — нарезать лук. Шаг 2 — разогреть масло. Шаг 3 — обжарить. Повар делает всё <strong>строго по порядку</strong>.</p>
<p>Программа — это то же самое, только вместо повара — компьютер, а вместо инструкций на русском — код на Python. Компьютер не думает и не догадывается. Он делает <em>ровно то</em>, что ты написал.</p>

<div class="key-point">
  <span class="key-icon">💡</span>
  <p><strong>Главное правило:</strong> если программа работает неправильно — это не баг компьютера. Это значит, что инструкция написана не так, как ты имел в виду. Это нормально. Все через это проходят.</p>
</div>

<h2>🚀 Где писать код (выбери один вариант)</h2>
<p><strong>Вариант А — Google Colab (рекомендую для старта):</strong></p>
<ul class="lesson-list">
  <li>Открой браузер → зайди на <code>colab.research.google.com</code></li>
  <li>Нажми «Новый блокнот»</li>
  <li>Кликни в серое поле (ячейку) → напиши код → нажми <kbd>Shift + Enter</kbd></li>
  <li>Никакой установки не нужно. Работает прямо в браузере.</li>
</ul>
<p><strong>Вариант Б — VS Code (для тех, кто хочет "по-взрослому"):</strong></p>
<ul class="lesson-list">
  <li>Скачай VS Code с сайта <code>code.visualstudio.com</code></li>
  <li>Скачай Python с <code>python.org</code> → установи</li>
  <li>В VS Code установи расширение «Python» от Microsoft</li>
  <li>Создай файл <code>main.py</code> → пиши код → запускай кнопкой ▶️</li>
</ul>

<div class="tip">
  <span class="tip-icon">🎯</span>
  <p><strong>Совет:</strong> если ты начинающий — иди в Colab. Не трать время на настройку среды, потрать его на код.</p>
</div>

<h2>📦 Переменные: коробки для данных</h2>
<p>Переменная — это именованная коробка, в которой хранится какое-то значение. Ты можешь в любой момент посмотреть, что там лежит, или положить туда что-то другое.</p>

<pre class="code-block"><code># Создаём переменную: слева имя, справа значение
name = "Дима"

# Теперь 'name' — это коробка, внутри которой строка "Дима"
# Когда пишем name, Python знает: надо взять то, что в коробке

print(name)   # выведет: Дима</code></pre>

<div class="key-point">
  <span class="key-icon">🔍</span>
  <p><strong>Разбор по строкам:</strong><br>
  <code>name = "Дима"</code> — знак <code>=</code> здесь НЕ означает "равно" (как в математике). Он означает <strong>"положить в коробку"</strong>. Мы говорим: "Возьми значение "Дима" и положи в коробку с именем name".<br><br>
  <code>print(name)</code> — функция <code>print()</code> говорит Python: "возьми то, что в коробке name, и выведи на экран".</p>
</div>

<h2>🧪 Четыре основных типа данных</h2>
<p>Python автоматически понимает, какой тип данных ты используешь. Но тебе важно знать разницу:</p>

<pre class="code-block"><code># Тип 1: str (строка) — любой текст в кавычках
city = "Москва"
greeting = 'Привет!'        # можно одинарные или двойные кавычки
empty_string = ""           # пустая строка тоже str

# Тип 2: int (целое число) — без точки
age = 23
year = 2026
negative = -5

# Тип 3: float (число с плавающей точкой) — с точкой
height = 1.82
score = 0.95
pi = 3.14159

# Тип 4: bool (логический) — только два значения
is_employed = True
has_debt = False

# Проверить тип можно через type()
print(type(city))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_employed)) # <class 'bool'></code></pre>

<div class="tip">
  <span class="tip-icon">⚠️</span>
  <p><strong>Частая ошибка новичков:</strong> написать <code>age = "23"</code> вместо <code>age = 23</code>. В первом случае age — это <em>строка</em> "23", а не число 23. И тогда <code>age + 1</code> выдаст ошибку, потому что нельзя сложить строку с числом. Запомни: числа пишутся <strong>без кавычек</strong>.</p>
</div>

<h2>➕ Арифметика с числами</h2>
<pre class="code-block"><code>a = 10
b = 3

print(a + b)   # 13  — сложение
print(a - b)   # 7   — вычитание
print(a * b)   # 30  — умножение
print(a / b)   # 3.333... — деление (всегда даёт float)
print(a // b)  # 3   — целочисленное деление (берёт целую часть)
print(a % b)   # 1   — остаток от деления (очень полезно!)
print(a ** b)  # 1000 — возведение в степень (10³)

# Практический пример: посчитать процент от суммы
total_sum = 150000
tax_rate = 0.13
tax = total_sum * tax_rate
print(f"Налог: {tax} руб.")   # 19500.0</code></pre>

<div class="key-point">
  <span class="key-icon">🔍</span>
  <p><strong>Что такое <code>%</code> и зачем он нужен?</strong><br>
  Остаток от деления — звучит скучно, но на практике очень удобен.<br>
  <code>10 % 2 = 0</code> — делится без остатка → число чётное<br>
  <code>11 % 2 = 1</code> — остаток 1 → число нечётное<br>
  Вот как проверить чётность: <code>if number % 2 == 0:</code></p>
</div>

<h2>🖨️ Функция print() — выводим на экран</h2>
<pre class="code-block"><code># Вывести текст
print("Привет, мир!")

# Вывести переменную
name = "Алексей"
print(name)

# Вывести несколько вещей сразу (через запятую)
age = 25
print("Имя:", name, "| Возраст:", age)
# Выведет: Имя: Алексей | Возраст: 25

# f-строка — самый удобный способ (используй его!)
# Ставишь f перед кавычкой, переменные в фигурных скобках
print(f"Меня зовут {name}, мне {age} лет")
# Выведет: Меня зовут Алексей, мне 25 лет

# Можно даже вычисления прямо внутри f-строки
salary = 80000
bonus = 15000
print(f"Итого в месяц: {salary + bonus} руб.")
# Выведет: Итого в месяц: 95000 руб.</code></pre>

<div class="tip">
  <span class="tip-icon">💡</span>
  <p><strong>Запомни f-строки раз и навсегда:</strong><br>
  Буква <code>f</code> стоит перед кавычкой: <code>f"текст {переменная} текст"</code><br>
  Переменная вставляется в <code>{}</code> фигурных скобках<br>
  Это самый читаемый и современный способ вставлять переменные в текст</p>
</div>

<h2>⌨️ Функция input() — пользователь вводит данные</h2>
<pre class="code-block"><code># input() останавливает программу и ждёт, пока пользователь что-то введёт
# То, что введёт пользователь, сохраняется в переменную

user_name = input("Как тебя зовут? ")
print(f"Привет, {user_name}!")

# ВАЖНО: input() ВСЕГДА возвращает строку (str)
# Поэтому если хочешь число — нужно явно преобразовать:

birth_year_str = input("В каком году ты родился? ")
# Сейчас birth_year_str это строка, например "2000"

birth_year = int(birth_year_str)
# Теперь birth_year это число 2000

# Можно сделать в одну строку:
birth_year = int(input("В каком году ты родился? "))

current_year = 2026
age = current_year - birth_year
print(f"Тебе {age} лет")</code></pre>

<div class="tip">
  <span class="tip-icon">⚠️</span>
  <p><strong>Самая частая ошибка с input():</strong><br>
  Код: <code>age = input("Возраст: ")</code><br>
  Затем: <code>age + 1</code> → <strong>ОШИБКА!</strong><br>
  Почему? Потому что input() вернул строку "25", а не число 25. Строку нельзя прибавить к числу.<br>
  Решение: <code>age = int(input("Возраст: "))</code></p>
</div>

<h2>🔄 Переменные можно переназначать</h2>
<pre class="code-block"><code>score = 0
print(f"Начальный счёт: {score}")   # 0

score = score + 10    # берём текущее значение, прибавляем 10, кладём обратно
print(f"После бонуса: {score}")     # 10

score = score + 5
print(f"Ещё бонус: {score}")        # 15

# Сокращённая запись (то же самое, но короче):
score += 10    # равно: score = score + 10
score -= 3     # равно: score = score - 3
score *= 2     # равно: score = score * 2
print(f"Финальный счёт: {score}")   # (15 + 10 - 3) * 2 = 44</code></pre>

<h2>🏋️ Мини-задача для проверки (попробуй сам)</h2>
<div class="tip">
  <span class="tip-icon">🎮</span>
  <p><strong>Задача:</strong> Напиши программу, которая:<br>
  1. Спрашивает имя пользователя<br>
  2. Спрашивает его зарплату<br>
  3. Считает, сколько он заработает за год<br>
  4. Выводит красивое сообщение с результатом</p>
</div>

<pre class="code-block"><code># Подсказка — структура программы:
name = input("Твоё имя: ")
monthly = int(input("Зарплата в месяц (руб): "))
yearly = monthly * 12   # считаем годовой доход
print(f"{name}, за год ты заработаешь {yearly} руб.")</code></pre>

<div class="summary-block">
  <h3>📌 Итоги урока</h3>
  <ul>
    <li>Переменная — именованная коробка для хранения данных</li>
    <li>4 основных типа: <code>str</code> (текст), <code>int</code> (целое), <code>float</code> (дробное), <code>bool</code> (истина/ложь)</li>
    <li><code>print()</code> — вывод на экран. f-строки — самый удобный способ</li>
    <li><code>input()</code> — ввод от пользователя. Всегда возвращает строку!</li>
    <li>Числа из input() надо преобразовывать: <code>int(input(...))</code></li>
  </ul>
</div>`,
      quiz: [
        { q: 'Что вернёт: type("100")?', opts: ['int', 'float', 'str', 'bool'], ans: 2, exp: '"100" — это текст в кавычках, значит тип str. Число 100 без кавычек было бы int.' },
        { q: 'Чему равно выражение 17 % 5?', opts: ['3', '2', '3.4', '12'], ans: 1, exp: '17 разделить на 5 = 3 и остаток 2. Оператор % возвращает именно остаток: 17 = 5*3 + 2.' },
        { q: 'Код: age = input("Возраст: ") → пользователь вводит 25. Что такое age?', opts: ['Число 25', 'Строка "25"', 'True', 'Ошибка'], ans: 1, exp: 'input() ВСЕГДА возвращает строку. Чтобы получить число, нужно: age = int(input("Возраст: ")).' },
        { q: 'Какая f-строка правильная?', opts: ['f"Имя: name"', '"Имя: {name}"', 'f"Имя: {name}"', 'f(Имя: name)'], ans: 2, exp: 'f-строка начинается с буквы f перед кавычкой, а переменные вставляются в фигурных скобках {}.' },
        { q: 'score = 10, затем score += 5. Чему равно score?', opts: ['10', '5', '15', '50'], ans: 2, exp: 'score += 5 это сокращение от score = score + 5, то есть 10 + 5 = 15.' },
        { q: 'Что делает знак = в строке: name = "Дима"?', opts: ['Сравнивает два значения', 'Помещает значение в переменную', 'Вызывает функцию', 'Создаёт тип данных'], ans: 1, exp: 'В Python = это оператор присваивания: положить значение справа в переменную слева. Для сравнения используется ==.' },
      ]
    },

    // ─────────────────────────────────────────────
    // УРОК 2 — Условия, циклы и функции
    // ─────────────────────────────────────────────
    {
      id: 'm1l2',
      title: 'Условия, циклы и функции',
      subtitle: 'Как заставить программу "думать" и не повторять код',
      readTime: 25,
      xp: 75,
      content: `
<div class="lesson-intro">
  <p class="lead">Пока что наши программы выполняются сверху вниз, строка за строкой. Но настоящие программы умеют принимать решения, повторять действия и переиспользовать куски кода. Именно этому ты научишься сейчас.</p>
</div>

<h2>🔀 Условия: программа принимает решения</h2>
<p>Смысл условий прост: <strong>если что-то верно — делай одно, иначе — делай другое.</strong></p>
<p>Как в жизни: "Если идёт дождь — возьми зонт. Если нет — не бери."</p>

<pre class="code-block"><code># Базовая структура
if УСЛОВИЕ:
    # этот код выполнится, если условие ИСТИННО (True)
    print("Условие выполнилось")
else:
    # этот код выполнится, если условие ЛОЖНО (False)
    print("Условие НЕ выполнилось")</code></pre>

<div class="key-point">
  <span class="key-icon">⚠️</span>
  <p><strong>Критически важно: отступы!</strong><br>
  В Python отступы — это не стиль, это часть синтаксиса. Код внутри if/else ОБЯЗАТЕЛЬНО должен быть сдвинут на 4 пробела (или 1 Tab). Если забудешь отступ — будет ошибка.<br><br>
  ✅ Правильно:<br>
  <code>if age > 18:</code><br>
  <code>    print("Взрослый")</code><br><br>
  ❌ Неправильно:<br>
  <code>if age > 18:</code><br>
  <code>print("Взрослый")   # IndentationError!</code></p>
</div>

<h2>Операторы сравнения (пишутся в условии)</h2>
<pre class="code-block"><code>a = 10
b = 5

print(a > b)    # True  — больше
print(a < b)    # False — меньше
print(a >= 10)  # True  — больше или равно
print(a <= 9)   # False — меньше или равно
print(a == 10)  # True  — равно (двойное ==, не одинарное!)
print(a != b)   # True  — не равно

# ВАЖНО: == для сравнения, = для присваивания
# age = 18   — положить 18 в переменную age
# age == 18  — проверить, равна ли age числу 18</code></pre>

<h2>Полная структура: if / elif / else</h2>
<pre class="code-block"><code>score = int(input("Введи оценку (0-100): "))

if score >= 90:
    grade = "Отлично"
    comment = "Так держать!"
elif score >= 75:            # elif = else if = иначе если
    grade = "Хорошо"
    comment = "Хороший результат"
elif score >= 60:
    grade = "Удовлетворительно"
    comment = "Есть куда расти"
else:
    grade = "Неудовлетворительно"
    comment = "Нужно повторить материал"

print(f"Оценка: {grade}")
print(f"Комментарий: {comment}")</code></pre>

<div class="key-point">
  <span class="key-icon">🔍</span>
  <p><strong>Как Python читает цепочку if/elif/else:</strong><br>
  1. Проверяет первое условие (<code>score >= 90</code>)<br>
  2. Если True — выполняет этот блок и ПРОПУСКАЕТ всё остальное<br>
  3. Если False — идёт к следующему elif<br>
  4. И так далее, пока не найдёт True или не дойдёт до else<br>
  <strong>Важно:</strong> выполнится только ОДИН блок, даже если несколько условий истинны</p>
</div>

<h2>Логические операторы: and, or, not</h2>
<pre class="code-block"><code>age = 25
income = 60000
has_job = True

# and — оба условия должны быть True
if age >= 18 and income >= 50000:
    print("Кредит одобрен")

# or — хотя бы одно условие True
if age < 18 or age > 65:
    print("Специальные условия")

# not — инвертирует условие
if not has_job:
    print("Нет работы")

# Комбинируй как угодно (скобки помогают читаемости)
if (age >= 18 and age <= 35) and (income > 40000 or has_job):
    print("Идеальный заёмщик")</code></pre>

<h2>🔁 Цикл for: повторяем действие для каждого элемента</h2>
<p>Представь, что тебе нужно обработать 1000 строк в таблице. Писать 1000 раз один и тот же код — безумие. Для этого и нужен цикл.</p>

<pre class="code-block"><code># for ПЕРЕМЕННАЯ in КОЛЛЕКЦИЯ:
#     код внутри цикла (с отступом!)

# Пример 1: проходим по списку
fruits = ["яблоко", "банан", "вишня"]

for fruit in fruits:
    print(f"Фрукт: {fruit}")
# Выведет:
# Фрукт: яблоко
# Фрукт: банан
# Фрукт: вишня

# Пример 2: range() — диапазон чисел
# range(5) создаёт числа 0, 1, 2, 3, 4 (5 не включается!)
for i in range(5):
    print(i)   # 0, 1, 2, 3, 4

# range(start, stop) — от start до stop (stop не включается)
for i in range(1, 6):
    print(i)   # 1, 2, 3, 4, 5

# range(start, stop, step) — с шагом
for i in range(0, 20, 5):
    print(i)   # 0, 5, 10, 15</code></pre>

<div class="key-point">
  <span class="key-icon">🔍</span>
  <p><strong>Переменная цикла (<code>fruit</code>, <code>i</code>):</strong><br>
  На каждой итерации (повторении) она получает следующее значение из коллекции.<br>
  Итерация 1: <code>fruit = "яблоко"</code><br>
  Итерация 2: <code>fruit = "банан"</code><br>
  Итерация 3: <code>fruit = "вишня"</code><br>
  Имя переменной (<code>fruit</code>, <code>i</code>, <code>item</code>) выбираешь ты сам.</p>
</div>

<h2>Цикл for на практике: считаем среднее</h2>
<pre class="code-block"><code>scores = [85, 92, 78, 95, 88, 76, 90]

# Задача: найти среднее значение
total = 0           # накопитель суммы

for score in scores:
    total = total + score    # добавляем каждый элемент к сумме

average = total / len(scores)    # len() возвращает количество элементов
print(f"Средний балл: {average:.1f}")   # :.1f — вывести с 1 знаком после запятой

# Также найдём максимум и минимум
best = max(scores)
worst = min(scores)
print(f"Лучший: {best}, Худший: {worst}")</code></pre>

<h2>🔄 Цикл while: повторяем, пока условие истинно</h2>
<pre class="code-block"><code># while УСЛОВИЕ:
#     код (выполняется пока условие True)

# Пример: угадай число
secret = 42
attempts = 0

while True:             # бесконечный цикл (выйдем через break)
    guess = int(input("Твоя попытка: "))
    attempts += 1

    if guess == secret:
        print(f"Угадал! Попыток: {attempts}")
        break           # break — немедленно выходим из цикла
    elif guess < secret:
        print("Больше!")
    else:
        print("Меньше!")</code></pre>

<div class="tip">
  <span class="tip-icon">⚠️</span>
  <p><strong>Осторожно с while — бесконечный цикл!</strong><br>
  Если условие while НИКОГДА не станет False и нет break — программа будет работать вечно.<br>
  Например: <code>while True: print("Привет")</code> — будет печатать бесконечно.<br>
  Если такое случилось в Colab — нажми квадрат (стоп) рядом с ячейкой.</p>
</div>

<h2>🔧 Функции: пишем код один раз — используем много раз</h2>
<p>Представь, что тебе часто нужно считать налог. Без функции ты пишешь одно и то же везде. С функцией — написал один раз, вызываешь когда нужно.</p>

<pre class="code-block"><code># Объявление функции:
# def ИМЯ(параметры):
#     тело функции (с отступом)
#     return результат  ← необязательно, но часто нужно

def calculate_tax(income):
    """Считает подоходный налог 13%"""   # документация функции
    tax = income * 0.13
    return tax                           # возвращаем результат

# Вызов функции:
my_tax = calculate_tax(80000)
print(f"Налог: {my_tax}")               # 10400.0

partner_tax = calculate_tax(120000)
print(f"Налог партнёра: {partner_tax}") # 15600.0</code></pre>

<div class="key-point">
  <span class="key-icon">🔍</span>
  <p><strong>Анатомия функции:</strong><br>
  <code>def</code> — ключевое слово, объявляет функцию<br>
  <code>calculate_tax</code> — имя функции (ты придумываешь сам)<br>
  <code>(income)</code> — параметр: переменная, которую принимает функция извне<br>
  <code>return tax</code> — отдаёт результат наружу, чтобы его можно было использовать<br><br>
  <strong>Разница print vs return:</strong><br>
  <code>print()</code> — просто показывает на экране, не даёт использовать значение<br>
  <code>return</code> — передаёт значение, его можно сохранить: <code>result = my_function()</code></p>
</div>

<h2>Функции с несколькими параметрами и значениями по умолчанию</h2>
<pre class="code-block"><code># Несколько параметров
def greet(name, role):
    return f"Привет, {name}! Твоя роль: {role}"

message = greet("Дима", "Data Scientist")
print(message)    # Привет, Дима! Твоя роль: Data Scientist

# Значения по умолчанию (если параметр не передан)
def greet_with_default(name, role="Стажёр"):
    return f"Привет, {name}! Твоя роль: {role}"

print(greet_with_default("Катя"))           # роль = "Стажёр"
print(greet_with_default("Вася", "Junior")) # роль = "Junior"

# Функция может возвращать несколько значений
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

low, high, avg = get_stats([4, 7, 2, 9, 1])
print(f"Мин: {low}, Макс: {high}, Среднее: {avg}")</code></pre>

<h2>🗄️ Списки: хранение коллекций данных</h2>
<pre class="code-block"><code># Список создаётся в квадратных скобках
skills = ["Python", "SQL", "Excel"]

# Доступ по индексу (счёт с нуля!)
print(skills[0])    # "Python" — первый элемент
print(skills[1])    # "SQL"
print(skills[-1])   # "Excel" — последний элемент (минус = с конца)

# Основные операции
skills.append("Pandas")     # добавить в конец
skills.insert(1, "Git")     # вставить на позицию 1
skills.remove("Excel")      # удалить по значению
popped = skills.pop()       # удалить и вернуть последний

print(len(skills))          # количество элементов
print("Python" in skills)   # True — проверка наличия

# Срезы [start:stop:step] — как в NumPy
print(skills[0:2])          # первые два элемента
print(skills[::-1])         # список задом наперёд

# Сортировка
numbers = [5, 2, 8, 1, 9, 3]
numbers.sort()              # сортирует на месте (изменяет список)
print(numbers)              # [1, 2, 3, 5, 8, 9]</code></pre>

<h2>📖 Словари: данные с именованными ключами</h2>
<pre class="code-block"><code># Словарь — это пары "ключ: значение"
# Идеально для хранения данных об одном объекте

profile = {
    "name": "Дима",
    "age": 24,
    "city": "Москва",
    "skills": ["Python", "SQL"],
    "is_employed": True
}

# Доступ к значению по ключу
print(profile["name"])          # "Дима"
print(profile["skills"])        # ["Python", "SQL"]

# Безопасный доступ (нет ключа → вернёт default, а не ошибку)
print(profile.get("salary", 0)) # 0 (ключа "salary" нет)

# Изменение и добавление
profile["age"] = 25             # изменить существующий
profile["company"] = "Сбер"     # добавить новый ключ

# Перебор словаря
for key, value in profile.items():
    print(f"{key}: {value}")

# Проверка наличия ключа
if "company" in profile:
    print(f"Работает в {profile['company']}")</code></pre>

<h2>🏋️ Мини-задачи для практики</h2>
<div class="tip">
  <span class="tip-icon">🎮</span>
  <p><strong>Задача 1:</strong> Напиши функцию <code>bmi(weight, height)</code>, которая считает индекс массы тела (вес / рост²) и возвращает строку: "Норма" (18.5-25), "Ниже нормы" (&lt;18.5), "Выше нормы" (&gt;25).</p>
</div>
<pre class="code-block"><code># Решение задачи 1:
def bmi(weight, height):
    index = weight / (height ** 2)
    if index < 18.5:
        return f"ИМТ {index:.1f} — Ниже нормы"
    elif index <= 25:
        return f"ИМТ {index:.1f} — Норма"
    else:
        return f"ИМТ {index:.1f} — Выше нормы"

print(bmi(70, 1.75))    # ИМТ 22.9 — Норма
print(bmi(50, 1.75))    # ИМТ 16.3 — Ниже нормы</code></pre>

<div class="tip">
  <span class="tip-icon">🎮</span>
  <p><strong>Задача 2:</strong> Напиши цикл, который выводит таблицу умножения на 7 (от 7×1 до 7×10).</p>
</div>
<pre class="code-block"><code># Решение задачи 2:
for i in range(1, 11):
    result = 7 * i
    print(f"7 × {i} = {result}")</code></pre>

<div class="summary-block">
  <h3>📌 Итоги урока</h3>
  <ul>
    <li><code>if/elif/else</code> — программа принимает решения. Отступы обязательны!</li>
    <li><code>==</code> для сравнения, <code>=</code> для присваивания. Это разные вещи!</li>
    <li><code>for</code> — перебирает элементы. <code>range()</code> — генератор чисел</li>
    <li><code>while</code> — работает пока условие True. <code>break</code> — выход из цикла</li>
    <li><code>def</code> — объявление функции. <code>return</code> — возвращает результат</li>
    <li>Список — упорядоченная коллекция. Словарь — пары ключ-значение</li>
  </ul>
</div>`,
      quiz: [
        { q: 'Код: score = 85. Что выведет if score >= 90: print("A") elif score >= 75: print("B") else: print("C")?', opts: ['A', 'B', 'C', 'AB'], ans: 1, exp: '85 >= 90 — False. Переходим к elif: 85 >= 75 — True. Выполняется print("B"). Блок else пропускается.' },
        { q: 'Чему равно len([10, 20, 30, 40])?', opts: ['3', '4', '40', '10'], ans: 1, exp: 'len() возвращает количество элементов в коллекции. В списке 4 элемента → 4.' },
        { q: 'Что делает break внутри цикла?', opts: ['Пропускает текущую итерацию', 'Немедленно выходит из цикла', 'Начинает цикл заново', 'Вызывает ошибку'], ans: 1, exp: 'break прерывает выполнение цикла полностью. Программа продолжает выполняться после цикла.' },
        { q: 'Функция: def add(a, b): return a + b. Что вернёт add(3, 4)?', opts: ['34', '7', 'None', 'Ошибка'], ans: 1, exp: 'Функция принимает a=3, b=4 и возвращает 3+4=7.' },
        { q: 'profile = {"age": 25}. Что вернёт profile.get("name", "Не указано")?', opts: ['"age"', '25', '"Не указано"', 'KeyError'], ans: 2, exp: 'Метод .get(ключ, default) возвращает default если ключ не найден. Ключа "name" нет, поэтому вернётся "Не указано".' },
        { q: 'skills = ["Python", "SQL", "Pandas"]. Что такое skills[-1]?', opts: ['"Python"', '"SQL"', '"Pandas"', 'Ошибка'], ans: 2, exp: 'Отрицательный индекс считает с конца. -1 — последний элемент, то есть "Pandas".' },
      ]
    },

    // ─────────────────────────────────────────────
    // УРОК 3 — Строки и работа с текстом
    // ─────────────────────────────────────────────
    {
      id: 'm1l3',
      title: 'Строки: всё что нужно знать',
      subtitle: 'Методы, срезы, форматирование — реальные приёмы',
      readTime: 18,
      xp: 70,
      content: `
<div class="lesson-intro">
  <p class="lead">В Data Science ты будешь работать с текстом постоянно: имена клиентов, категории, описания, логи. Этот урок даст тебе полный набор инструментов для работы со строками.</p>
</div>

<h2>🔤 Строки — это последовательность символов</h2>
<pre class="code-block"><code>text = "Привет, Дима!"

# Каждый символ имеет индекс (с нуля)
print(text[0])      # "П"
print(text[7])      # "Д"
print(text[-1])     # "!" — последний символ

# Срез строки [start:stop] — получить часть
print(text[0:7])    # "Привет,"
print(text[8:])     # "Дима!" — до конца
print(text[:7])     # "Привет," — с начала

# Длина строки
print(len(text))    # 13</code></pre>

<h2>🔧 Самые полезные методы строк</h2>
<pre class="code-block"><code>name = "  дима иванов  "    # строка с лишними пробелами

# Очистка и регистр
print(name.strip())          # "дима иванов" — убрать пробелы по краям
print(name.strip().title())  # "Дима Иванов" — каждое слово с большой
print(name.strip().upper())  # "ДИМА ИВАНОВ" — всё большими
print(name.strip().lower())  # "дима иванов" — всё маленькими

# Поиск и замена
email = "dima@sber.ru"
print(email.find("@"))         # 4 — индекс символа (или -1 если нет)
print("@" in email)            # True — проверить наличие
print(email.replace("sber", "tbank"))   # "dima@tbank.ru"

# Разделение и склейка
csv_line = "Дима,24,Москва,Python"
parts = csv_line.split(",")    # ["Дима", "24", "Москва", "Python"]
print(parts[0])                # "Дима"
print(parts[3])                # "Python"

# Склеить обратно через разделитель
joined = " | ".join(parts)     # "Дима | 24 | Москва | Python"
print(joined)

# Проверки
print("123".isdigit())         # True — все символы цифры
print("hello".isalpha())       # True — все буквы
print("  ".strip() == "")      # True — строка пустая после strip</code></pre>

<div class="key-point">
  <span class="key-icon">🏦</span>
  <p><strong>Реальный кейс:</strong> при работе с данными клиентов часто приходят "грязные" строки: лишние пробелы, разный регистр, опечатки. Методы <code>.strip()</code>, <code>.lower()</code>, <code>.replace()</code> — это базовая очистка данных, которую ты будешь применять постоянно.</p>
</div>

<h2>📐 Форматирование чисел в строках</h2>
<pre class="code-block"><code>pi = 3.14159265358979
salary = 1500000
percent = 0.8756

# Количество знаков после запятой
print(f"{pi:.2f}")          # "3.14" — 2 знака после точки
print(f"{pi:.4f}")          # "3.1416" — 4 знака

# Разделитель тысяч (для больших чисел)
print(f"{salary:,}")        # "1,500,000"
print(f"{salary:_}")        # "1_500_000"

# Проценты
print(f"{percent:.1%}")     # "87.6%"

# Выравнивание
print(f"{'Имя':<10} {'Возраст':>5}")   # левое и правое выравнивание
print(f"{'Дима':<10} {24:>5}")
print(f"{'Катя':<10} {31:>5}")</code></pre>

<h2>🧩 List Comprehension — мощный инструмент</h2>
<p>Это способ создать список в одну строку. Вместо цикла на 3 строки — одна красивая строка.</p>
<pre class="code-block"><code># Обычный способ (3 строки):
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# List Comprehension (1 строка):
squares = [i ** 2 for i in range(1, 6)]
print(squares)    # [1, 4, 9, 16, 25]

# С условием: только чётные числа
evens = [i for i in range(20) if i % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Обработка строк — реальный пример:
names = ["  Дима ", "КАТЯ", "вася  "]
clean_names = [n.strip().title() for n in names]
print(clean_names)    # ["Дима", "Катя", "Вася"]

# Фильтрация: только имена длиннее 4 символов
long_names = [n for n in clean_names if len(n) > 4]</code></pre>

<div class="tip">
  <span class="tip-icon">💡</span>
  <p><strong>Формула List Comprehension:</strong><br>
  <code>[ВЫРАЖЕНИЕ for ПЕРЕМЕННАЯ in КОЛЛЕКЦИЯ if УСЛОВИЕ]</code><br>
  Часть <code>if УСЛОВИЕ</code> необязательна. Читается как: "Для каждого элемента в коллекции, если выполняется условие, добавить выражение в список".</p>
</div>

<h2>🏋️ Практические задачи</h2>
<div class="tip">
  <span class="tip-icon">🎮</span>
  <p><strong>Задача 1:</strong> Дан список email-адресов. Выведи только те, которые заканчиваются на "@sber.ru".</p>
</div>
<pre class="code-block"><code>emails = [
    "ivan@sber.ru",
    "kate@gmail.com",
    "alex@sber.ru",
    "test@yandex.ru"
]

sber_emails = [e for e in emails if e.endswith("@sber.ru")]
print(sber_emails)    # ["ivan@sber.ru", "alex@sber.ru"]</code></pre>

<div class="tip">
  <span class="tip-icon">🎮</span>
  <p><strong>Задача 2:</strong> Напиши функцию <code>clean_phone(phone)</code>, которая принимает номер телефона в любом формате и возвращает только цифры. "+7 (916) 123-45-67" → "79161234567"</p>
</div>
<pre class="code-block"><code>def clean_phone(phone):
    # isdigit() проверяет, является ли символ цифрой
    digits = [ch for ch in phone if ch.isdigit()]
    return "".join(digits)

print(clean_phone("+7 (916) 123-45-67"))   # "79161234567"
print(clean_phone("8-800-555-35-35"))       # "88005553535"</code></pre>

<div class="summary-block">
  <h3>📌 Итоги урока</h3>
  <ul>
    <li>Строки индексируются с нуля. Срезы: <code>text[start:stop]</code></li>
    <li>Ключевые методы: <code>.strip()</code>, <code>.lower()</code>, <code>.upper()</code>, <code>.split()</code>, <code>.replace()</code></li>
    <li>f-строки поддерживают форматирование: <code>:.2f</code>, <code>:,</code>, <code>:.1%</code></li>
    <li>List Comprehension — создаёт список в одну строку</li>
  </ul>
</div>`,
      quiz: [
        { q: 'text = "hello". Что вернёт text.upper()?', opts: ['"hello"', '"Hello"', '"HELLO"', 'Ошибка'], ans: 2, exp: '.upper() переводит все символы строки в верхний регистр.' },
        { q: '"a,b,c".split(",") вернёт:', opts: ['"a b c"', '["a","b","c"]', '("a","b","c")', '"abc"'], ans: 1, exp: '.split(разделитель) разбивает строку по разделителю и возвращает список строк.' },
        { q: 'Что такое [x*2 for x in [1,2,3]]?', opts: ['[1,2,3,1,2,3]', '[2,4,6]', '[[2],[4],[6]]', 'Ошибка'], ans: 1, exp: 'List comprehension: для каждого x из [1,2,3] вычисляем x*2 → [2, 4, 6].' },
        { q: '"  пробелы  ".strip() вернёт:', opts: ['"  пробелы  "', '"пробелы"', '""', '"пробелы  "'], ans: 1, exp: '.strip() убирает пробелы (и другие пробельные символы) с обоих краёв строки.' },
        { q: 'f"{3.14159:.2f}" вернёт:', opts: ['"3.14159"', '"3"', '"3.14"', '"3.15"'], ans: 2, exp: ':.2f в f-строке означает: форматировать как float с 2 знаками после запятой → "3.14". При этом происходит округление.' },
      ]
    },

    // ─────────────────────────────────────────────
    // УРОК 4 — Отладка, ошибки и хорошие практики
    // ─────────────────────────────────────────────
    {
      id: 'm1l4',
      title: 'Ошибки, отладка и правила хорошего кода',
      subtitle: 'Как читать ошибки и не бояться их',
      readTime: 15,
      xp: 65,
      content: `
<div class="lesson-intro">
  <p class="lead">Ошибки в коде — это нормально. Абсолютно нормально. Даже опытные разработчики пишут с ошибками каждый день. Разница в том, что они умеют быстро их читать и исправлять. Ты тоже научишься.</p>
</div>

<h2>🔴 Три главных типа ошибок Python</h2>

<h3>1. SyntaxError — ошибка синтаксиса</h3>
<p>Python не может прочитать твой код. Забыл двоеточие, скобку, кавычку.</p>
<pre class="code-block"><code># ❌ ОШИБКА:
if age > 18    # забыли двоеточие
    print("Взрослый")

# ✅ ПРАВИЛЬНО:
if age > 18:
    print("Взрослый")

# ❌ ОШИБКА: незакрытая скобка
print("Привет"

# ✅ ПРАВИЛЬНО:
print("Привет")</code></pre>

<h3>2. NameError — переменная не существует</h3>
<pre class="code-block"><code># ❌ ОШИБКА: используем переменную до создания
print(usernme)    # опечатка в имени
# NameError: name 'usernme' is not defined

# ❌ ОШИБКА: Python чувствителен к регистру
name = "Дима"
print(Name)       # Name ≠ name
# NameError: name 'Name' is not defined

# ✅ ПРАВИЛЬНО:
username = "Дима"
print(username)</code></pre>

<h3>3. TypeError — неправильный тип данных</h3>
<pre class="code-block"><code># ❌ ОШИБКА: строка + число
age_str = input("Возраст: ")  # возвращает строку!
new_age = age_str + 1
# TypeError: can only concatenate str (not "int") to str

# ✅ ПРАВИЛЬНО:
age = int(input("Возраст: "))
new_age = age + 1

# ❌ ОШИБКА: len от числа
print(len(42))
# TypeError: object of type 'int' has no len()

# ✅ ПРАВИЛЬНО:
print(len("42"))   # 2 — длина строки</code></pre>

<h3>4. IndexError — выход за пределы списка</h3>
<pre class="code-block"><code>fruits = ["яблоко", "банан"]  # индексы: 0 и 1

# ❌ ОШИБКА:
print(fruits[5])    # IndexError: list index out of range

# ✅ ПРАВИЛЬНО: сначала проверь длину
if len(fruits) > 5:
    print(fruits[5])</code></pre>

<h3>5. ZeroDivisionError — деление на ноль</h3>
<pre class="code-block"><code>total = 100
count = 0

# ❌ ОШИБКА:
average = total / count   # ZeroDivisionError!

# ✅ ПРАВИЛЬНО:
if count > 0:
    average = total / count
else:
    average = 0
    print("Нет данных для подсчёта")</code></pre>

<h2>🛡️ try / except — обработка ошибок</h2>
<p>Иногда ты знаешь, что что-то может пойти не так (например, пользователь введёт буквы вместо числа). В таком случае используй try/except:</p>
<pre class="code-block"><code>try:
    age = int(input("Введи возраст: "))
    print(f"Через 10 лет тебе будет {age + 10}")
except ValueError:
    print("Ошибка: введи целое число, а не текст")

# Несколько типов ошибок:
try:
    x = int(input("Число: "))
    result = 100 / x
    print(f"Результат: {result}")
except ValueError:
    print("Это не число!")
except ZeroDivisionError:
    print("Нельзя делить на ноль!")</code></pre>

<h2>🔍 Как читать сообщение об ошибке</h2>
<pre class="code-block"><code># Представь, что ты видишь такую ошибку:
#
# Traceback (most recent call last):
#   File "main.py", line 8, in <module>
#     result = total / count
# ZeroDivisionError: division by zero
#
# Как читать:
# 1. "line 8" — ошибка в строке 8 твоего файла
# 2. "result = total / count" — вот эта строка
# 3. "ZeroDivisionError" — тип ошибки
# 4. "division by zero" — описание: делишь на ноль
#
# Алгоритм исправления:
# Шаг 1: смотри на номер строки
# Шаг 2: читай тип ошибки (последняя строка)
# Шаг 3: читай описание ошибки
# Шаг 4: исправляй</code></pre>

<div class="key-point">
  <span class="key-icon">💡</span>
  <p><strong>Лайфхак:</strong> скопируй текст ошибки и вставь в ChatGPT или Google. Большинство ошибок Python решаются за 30 секунд таким образом. Это не стыдно — это нормальная практика даже у Senior-разработчиков.</p>
</div>

<h2>✅ Правила хорошего кода (PEP 8)</h2>
<pre class="code-block"><code># ❌ ПЛОХОЙ код — непонятно, что происходит
def f(x,y):
    z=x+y
    if z>100:return True
    else:return False

# ✅ ХОРОШИЙ код — читается как текст
def is_high_income(monthly_salary, bonus):
    """Проверяет, превышает ли доход порог в 100000."""
    total = monthly_salary + bonus
    if total > 100000:
        return True
    else:
        return False

# Правила PEP 8 (главные):
# 1. Отступы: 4 пробела (не Tab)
# 2. Пробелы вокруг операторов: a = 1, не a=1
# 3. Имена переменных: snake_case (monthly_salary, not monthlySalary)
# 4. Имена функций: глагол + существительное (calculate_tax, get_stats)
# 5. Одна пустая строка между функциями
# 6. Максимальная длина строки: 79 символов</code></pre>

<h2>💬 Комментарии: объясняй код для себя</h2>
<pre class="code-block"><code># Однострочный комментарий начинается с #
# Python его игнорирует при выполнении

# Хорошие комментарии объясняют ПОЧЕМУ, а не ЧТО
# ❌ Плохо:
x = x + 1  # прибавить 1 к x (и так понятно!)

# ✅ Хорошо:
attempts += 1  # считаем попытки для ограничения по бизнес-правилу

# Многострочные строки как документация функции:
def calculate_tax(income, rate=0.13):
    """
    Вычисляет налог с дохода.

    income: доход в рублях
    rate: налоговая ставка (по умолчанию 13%)
    Возвращает: сумму налога
    """
    return income * rate</code></pre>

<div class="summary-block">
  <h3>📌 Итоги урока</h3>
  <ul>
    <li>SyntaxError — забыл <code>:</code>, скобку или кавычку</li>
    <li>NameError — переменная не создана или опечатка</li>
    <li>TypeError — неправильный тип (строка вместо числа)</li>
    <li><code>try/except</code> — защита от предсказуемых ошибок</li>
    <li>Читай ошибку снизу вверх: тип → описание → номер строки</li>
    <li>Хорошие имена и комментарии — это забота о себе будущем</li>
  </ul>
</div>`,
      quiz: [
        { q: 'Код: print(hello). Какая ошибка?', opts: ['SyntaxError', 'NameError', 'TypeError', 'ValueError'], ans: 1, exp: 'hello без кавычек — это имя переменной. Если переменная hello не была создана, Python выдаст NameError.' },
        { q: 'Код: "5" + 5. Какая ошибка?', opts: ['SyntaxError', 'NameError', 'TypeError', 'ZeroDivisionError'], ans: 2, exp: 'Нельзя сложить строку "5" и число 5. Python выдаст TypeError. Решение: int("5") + 5 или "5" + str(5).' },
        { q: 'Для чего нужен блок try/except?', opts: ['Для ускорения кода', 'Для обработки ожидаемых ошибок без крашей программы', 'Для создания переменных', 'Для импорта библиотек'], ans: 1, exp: 'try/except позволяет перехватить ошибку и обработать её (например, вывести понятное сообщение), вместо того чтобы программа упала.' },
        { q: 'Какой стиль имён переменных рекомендован в Python?', opts: ['camelCase (myVariable)', 'snake_case (my_variable)', 'PascalCase (MyVariable)', 'UPPER_CASE (MY_VARIABLE)'], ans: 1, exp: 'По стандарту PEP 8 переменные и функции пишутся в snake_case: слова разделяются подчёркиванием.' },
      ]
    },

    // ─────────────────────────────────────────────
    // УРОК 5 — Практика: 15 задач с подсказками
    // ─────────────────────────────────────────────
    {
      id: 'm1l5',
      title: 'Большая практика: 15 задач с разбором',
      subtitle: 'Закрепляем всё — от переменных до функций',
      readTime: 30,
      xp: 100,
      content: `
<div class="lesson-intro">
  <p class="lead">Теория без практики не работает. В этом уроке — 15 задач разного уровня. Каждая задача идёт с подсказкой и готовым решением. Но сначала — попробуй сам. Даже если не получится — это нормально. Смотришь на решение, понимаешь, идёшь дальше.</p>
</div>

<div class="key-point">
  <span class="key-icon">🎯</span>
  <p><strong>Как работать с этим уроком:</strong><br>
  1. Читаешь задачу<br>
  2. Пробуешь написать сам (хотя бы 5 минут)<br>
  3. Если застрял — смотришь подсказку<br>
  4. Смотришь решение и понимаешь, почему именно так<br>
  5. Переписываешь решение руками (не копируй!)</p>
</div>

<h2>⭐ Уровень 1: Основы (задачи 1-5)</h2>

<h3>Задача 1: Калькулятор возраста</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Спроси у пользователя год рождения. Посчитай возраст. Выведи сообщение: "Тебе X лет. Через 10 лет будет Y лет."</p>
</div>
<pre class="code-block"><code># Подсказка: нужны int(), f-строки и арифметика
birth_year = int(input("Год рождения: "))
age = 2026 - birth_year
print(f"Тебе {age} лет.")
print(f"Через 10 лет будет {age + 10} лет.")</code></pre>

<h3>Задача 2: Чётное или нечётное</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Спроси число. Определи, чётное оно или нечётное. Подсказка: используй оператор <code>%</code></p>
</div>
<pre class="code-block"><code>num = int(input("Введи число: "))

if num % 2 == 0:
    print(f"{num} — чётное")
else:
    print(f"{num} — нечётное")</code></pre>

<h3>Задача 3: Максимум из трёх чисел</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Спроси три числа. Найди и выведи максимальное. Попробуй сначала через if/elif/else, потом через встроенную функцию <code>max()</code></p>
</div>
<pre class="code-block"><code>a = int(input("Число 1: "))
b = int(input("Число 2: "))
c = int(input("Число 3: "))

# Способ 1: через условия
if a >= b and a >= c:
    biggest = a
elif b >= a and b >= c:
    biggest = b
else:
    biggest = c
print(f"Максимум: {biggest}")

# Способ 2: короткий (встроенная функция)
print(f"Максимум: {max(a, b, c)}")</code></pre>

<h3>Задача 4: Таблица умножения</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Спроси число N. Выведи таблицу умножения на N (от N×1 до N×10). Подсказка: используй <code>for</code> и <code>range(1, 11)</code></p>
</div>
<pre class="code-block"><code>n = int(input("На что умножаем? "))

for i in range(1, 11):
    result = n * i
    print(f"{n} × {i:2d} = {result}")</code></pre>

<h3>Задача 5: Сумма цифр числа</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Введи число. Посчитай сумму его цифр. Например, 123 → 1+2+3 = 6. Подсказка: преврати число в строку, потом перебери символы циклом.</p>
</div>
<pre class="code-block"><code>number = input("Введи число: ")    # берём как строку!
total = 0

for digit in number:
    total += int(digit)    # каждый символ-цифру превращаем в int

print(f"Сумма цифр числа {number}: {total}")

# Или через list comprehension (продвинуто, но красиво):
total = sum(int(d) for d in number)
print(f"Сумма цифр: {total}")</code></pre>

<h2>⭐⭐ Уровень 2: Функции и коллекции (задачи 6-10)</h2>

<h3>Задача 6: Классификатор оценок</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>grade_letter(score)</code>, которая принимает число 0-100 и возвращает: A (90-100), B (75-89), C (60-74), F (ниже 60).</p>
</div>
<pre class="code-block"><code>def grade_letter(score):
    """Конвертирует числовую оценку в буквенную."""
    if score >= 90:
        return "A"
    elif score >= 75:
        return "B"
    elif score >= 60:
        return "C"
    else:
        return "F"

# Тестируем:
test_scores = [95, 82, 67, 45, 100, 59]
for s in test_scores:
    print(f"Оценка {s} → {grade_letter(s)}")</code></pre>

<h3>Задача 7: Статистика списка</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>describe(numbers)</code>, которая принимает список чисел и возвращает словарь с ключами: min, max, sum, average, count.</p>
</div>
<pre class="code-block"><code>def describe(numbers):
    """Считает основные статистики списка."""
    if not numbers:    # если список пустой
        return None

    return {
        "min":     min(numbers),
        "max":     max(numbers),
        "sum":     sum(numbers),
        "average": sum(numbers) / len(numbers),
        "count":   len(numbers)
    }

salaries = [65000, 80000, 120000, 55000, 95000, 72000]
stats = describe(salaries)

for key, value in stats.items():
    print(f"{key:10}: {value:,.0f}")</code></pre>

<h3>Задача 8: Валидация email</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>is_valid_email(email)</code>, которая проверяет: есть ли <code>@</code>, есть ли точка после <code>@</code>, длина больше 5. Возвращает True/False.</p>
</div>
<pre class="code-block"><code>def is_valid_email(email):
    """Простая проверка валидности email."""
    email = email.strip().lower()

    if len(email) < 5:
        return False
    if "@" not in email:
        return False

    parts = email.split("@")
    if len(parts) != 2:          # должна быть ровно одна @
        return False

    domain = parts[1]            # часть после @
    if "." not in domain:        # должна быть точка в домене
        return False

    return True

# Тесты:
emails = ["user@mail.ru", "bad-email", "a@b.c", "@nodomain.ru", "noDot@com"]
for e in emails:
    status = "✅" if is_valid_email(e) else "❌"
    print(f"{status} {e}")</code></pre>

<h3>Задача 9: Подсчёт слов</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>word_count(text)</code>, которая принимает строку и возвращает словарь с количеством вхождений каждого слова. Не учитывай регистр.</p>
</div>
<pre class="code-block"><code>def word_count(text):
    """Считает вхождения каждого слова в тексте."""
    words = text.lower().split()
    counts = {}

    for word in words:
        # Если слово уже есть в словаре — увеличиваем счётчик
        # Если нет — начинаем с 0 и прибавляем 1
        counts[word] = counts.get(word, 0) + 1

    return counts

sample = "Python это круто Python это просто Python"
result = word_count(sample)

# Сортируем по количеству (от большего к меньшему)
for word, count in sorted(result.items(), key=lambda x: x[1], reverse=True):
    print(f"{word}: {count}")</code></pre>

<h3>Задача 10: FizzBuzz (классика интервью!)</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Выведи числа от 1 до 50. Но: если число делится на 3 — выводи "Fizz", на 5 — "Buzz", на 15 — "FizzBuzz". Иначе — само число.</p>
</div>
<pre class="code-block"><code>for i in range(1, 51):
    if i % 15 == 0:       # проверяй на 15 ПЕРВЫМ (делится на и 3 и 5)
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)</code></pre>

<h2>⭐⭐⭐ Уровень 3: Реальные задачи (задачи 11-15)</h2>

<h3>Задача 11: Конвертер валют</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию конвертации. Хранить курсы в словаре. Принимать сумму и валюту, возвращать в рублях.</p>
</div>
<pre class="code-block"><code>def convert_to_rub(amount, currency):
    """Конвертирует сумму из заданной валюты в рубли."""
    rates = {
        "USD": 90.5,
        "EUR": 97.3,
        "CNY": 12.4,
        "GBP": 113.7
    }

    if currency not in rates:
        return f"Неизвестная валюта: {currency}"

    result = amount * rates[currency]
    return f"{amount} {currency} = {result:,.0f} руб."

print(convert_to_rub(100, "USD"))   # 100 USD = 9,050 руб.
print(convert_to_rub(50, "EUR"))    # 50 EUR = 4,865 руб.
print(convert_to_rub(200, "JPY"))   # Неизвестная валюта: JPY</code></pre>

<h3>Задача 12: Анализ оценок студентов</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Дан список студентов со словарями {name, scores}. Напиши код, который выводит таблицу: имя, средний балл, итоговая оценка.</p>
</div>
<pre class="code-block"><code>students = [
    {"name": "Алексей", "scores": [85, 90, 78, 92]},
    {"name": "Катерина", "scores": [95, 88, 91, 97]},
    {"name": "Дмитрий",  "scores": [60, 55, 70, 65]},
    {"name": "Мария",    "scores": [75, 80, 82, 78]},
]

def grade_letter(score):
    if score >= 90: return "A"
    elif score >= 75: return "B"
    elif score >= 60: return "C"
    else: return "F"

print(f"{'Имя':<12} {'Средний балл':>13} {'Оценка':>8}")
print("-" * 35)

for student in students:
    avg = sum(student["scores"]) / len(student["scores"])
    grade = grade_letter(avg)
    print(f"{student['name']:<12} {avg:>13.1f} {grade:>8}")</code></pre>

<h3>Задача 13: Генератор паролей</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>check_password(pwd)</code>, которая проверяет пароль на: длину >= 8, есть цифра, есть буква в верхнем регистре. Выводит список проблем.</p>
</div>
<pre class="code-block"><code>def check_password(pwd):
    """Проверяет надёжность пароля и возвращает список проблем."""
    problems = []

    if len(pwd) < 8:
        problems.append("❌ Минимум 8 символов")

    if not any(ch.isdigit() for ch in pwd):
        problems.append("❌ Нужна хотя бы одна цифра")

    if not any(ch.isupper() for ch in pwd):
        problems.append("❌ Нужна хотя бы одна заглавная буква")

    if not any(ch.islower() for ch in pwd):
        problems.append("❌ Нужна хотя бы одна строчная буква")

    if not problems:
        return "✅ Пароль надёжный!"
    return "\n".join(problems)

passwords = ["qwerty", "Python3", "MyPass123", "abc"]
for pwd in passwords:
    print(f"\nПароль: '{pwd}'")
    print(check_password(pwd))</code></pre>

<h3>Задача 14: Мини-база данных</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Создай простую "базу" пользователей (список словарей). Напиши функции: <code>add_user()</code>, <code>find_user(name)</code>, <code>all_users()</code>.</p>
</div>
<pre class="code-block"><code>users = []    # наша "база данных" — список словарей

def add_user(name, age, city):
    """Добавляет нового пользователя."""
    user = {
        "id": len(users) + 1,    # автоинкрементный ID
        "name": name,
        "age": age,
        "city": city
    }
    users.append(user)
    print(f"✅ Добавлен: {name}")

def find_user(name):
    """Ищет пользователя по имени."""
    for user in users:
        if user["name"].lower() == name.lower():
            return user
    return None

def all_users():
    """Выводит всех пользователей."""
    print(f"\n{'ID':>4} {'Имя':<12} {'Возраст':>8} {'Город':<12}")
    print("-" * 40)
    for u in users:
        print(f"{u['id']:>4} {u['name']:<12} {u['age']:>8} {u['city']:<12}")

# Тест:
add_user("Дима",   24, "Москва")
add_user("Катя",   31, "СПб")
add_user("Алексей", 28, "Казань")

all_users()

result = find_user("катя")    # регистр не важен
if result:
    print(f"\nНайден: {result}")</code></pre>

<h3>Задача 15: Финальная — кредитный калькулятор</h3>
<div class="tip">
  <span class="tip-icon">📝</span>
  <p>Напиши функцию <code>loan_payment(principal, rate, months)</code>, которая считает ежемесячный платёж по кредиту по формуле аннуитета.</p>
</div>
<pre class="code-block"><code>def loan_payment(principal, annual_rate, months):
    """
    Считает ежемесячный аннуитетный платёж по кредиту.

    principal:    сумма кредита (руб)
    annual_rate:  годовая ставка (%, например 15)
    months:       срок в месяцах

    Формула: M = P * r * (1+r)^n / ((1+r)^n - 1)
    где r = месячная ставка = annual_rate / 12 / 100
    """
    r = annual_rate / 12 / 100    # месячная ставка в долях

    if r == 0:                     # ставка 0% — просто делим
        return principal / months

    monthly = principal * r * (1 + r)**months / ((1 + r)**months - 1)
    total = monthly * months
    overpayment = total - principal

    return {
        "monthly_payment": round(monthly, 2),
        "total_payment":   round(total, 2),
        "overpayment":     round(overpayment, 2)
    }

# Пример: ипотека 5 000 000 руб под 12% на 20 лет (240 месяцев)
result = loan_payment(5_000_000, 12, 240)
print(f"Ежемесячный платёж: {result['monthly_payment']:,.0f} руб.")
print(f"Всего выплатишь:    {result['total_payment']:,.0f} руб.")
print(f"Переплата:          {result['overpayment']:,.0f} руб.")</code></pre>

<div class="summary-block">
  <h3>🏆 Ты прошёл большую практику!</h3>
  <ul>
    <li>15 задач: от простых до реальных бизнес-кейсов</li>
    <li>Ты умеешь работать с переменными, условиями, циклами, функциями</li>
    <li>Ты умеешь хранить данные в списках и словарях</li>
    <li>Ты видел реальные применения: кредит, база данных, валюты, пароли</li>
    <li>Следующий шаг — NumPy и Pandas: работа с настоящими данными</li>
  </ul>
</div>`,
      quiz: [
        { q: 'Ты написал функцию, она работает неправильно. Что делаешь первым?', opts: ['Удаляешь и пишешь заново', 'Читаешь сообщение об ошибке сверху вниз', 'Читаешь сообщение об ошибке снизу вверх: тип ошибки → номер строки', 'Смотришь другой урок'], ans: 2, exp: 'Traceback читается снизу вверх: последняя строка — тип и описание ошибки, чуть выше — строка кода, где она произошла.' },
        { q: 'В FizzBuzz: почему проверку на 15 делают первой?', opts: ['Традиция', 'Иначе число делится на 3 и выведется Fizz вместо FizzBuzz', '15 < 3 < 5', 'Это быстрее'], ans: 1, exp: 'Если сначала проверить i % 3 == 0, то для числа 15 выведется "Fizz" и условие elif i % 5 никогда не будет проверено. Поэтому самое специфичное условие (делится на оба) идёт первым.' },
        { q: 'counts.get(word, 0) — зачем здесь 0?', opts: ['Инициализирует счётчик нулём если слово встречается впервые', 'Удаляет слово', 'Сортирует словарь', 'Это случайное число'], ans: 0, exp: '.get(key, default) — если ключ есть, вернуть его значение. Если нет — вернуть default (0). Так мы безопасно начинаем счётчик с 0 для нового слова.' },
        { q: 'any(ch.isdigit() for ch in pwd) возвращает True когда:', opts: ['Все символы — цифры', 'Хотя бы один символ — цифра', 'Нет ни одной цифры', 'Ровно одна цифра'], ans: 1, exp: 'any() возвращает True если ХОТЯ БЫ ОДНО значение из коллекции истинно. all() вернул бы True только если ВСЕ истинны.' },
        { q: 'Почему сумму кредита пишут 5_000_000 с подчёркиваниями?', opts: ['Это обязательный синтаксис', 'Только для float', 'Для читаемости — Python игнорирует _ в числах', 'Это другой тип данных'], ans: 2, exp: 'Python позволяет использовать _ как разделитель в числах для читаемости. 5_000_000 и 5000000 — это одно и то же число.' },
      ]
    }

  ] // конец lessons массива
} // конец модуля m1

// ═══════════════════════════════════════════════════════════════════
// КАК ИСПОЛЬЗОВАТЬ:
// 1. Открой свой основной файл (index.txt/index.js)
// 2. Найди объект модуля m1 в DS_CONTENT.modules (первый в массиве)
// 3. Замени весь объект от { id: 'm1', ... до закрывающей }
//    на содержимое этого файла (от { id: 'm1', до последней })
// ═══════════════════════════════════════════════════════════════════
