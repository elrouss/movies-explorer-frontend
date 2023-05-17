<h1 align="center">Дипломный проект: "Movies Explorer" (frontend)</h1>

<div align="center">
  <a href="https://elrouss.movies.nomoredomains.monster/">
    <img width="575" alt="Основной функционал приложения" src="https://github.com/elrouss/movies-explorer-frontend/assets/108838349/e3cb7168-dd56-4005-80c8-44ba833844de">
  </a>
</div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории, эксплуатация</a></li>
      <li><a href="#establishing">Процесс создания</a></li>
      <li><a href="#functionality">Функционал</a></li>
      <li><a href="#enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Дипломный проект "Movies Explorer" - приложение для поиска и просмотра фильмов международного фестиваля документального кино о новой культуре <a href="https://beatfilmfestival.ru/">"Beat Film Festival"</a>. Выполнен в рамках образовательной программы <a href="https://practicum.yandex.ru/">Яндекс Практикума</a> и представляет собой отзывчиво-адаптивное приложение (SPA), написанное на "React" (часть frontend) и "Express" (часть backend).

<b>Ссылки на проект:</b>
<br>
IP: 158.160.47.171
<br>
Frontend (деплой): https://elrouss.movies.nomoredomains.monster/
<br>
Pull-request: 
<br>
Backend: https://api.elrouss.movies.nomoredomains.monster/

<b>Ссылка на макет:</b> https://disk.yandex.ru/d/tLqZ9NlxEjOxWQ
<br>
<b>Ссылка на чек-лист</b>: https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/checklist_react_diplom.pdf
<br>

<i>* - проект прошел код-ревью</i>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Иконка 'JavaScript'">
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Иконка 'Sass (SCSS)'">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
</span>

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения в локальном репозитории, эксплуатация</h2></a>
1. `git clone https://github.com/elrouss/movies-explorer-frontend.git` - клонировать репозиторий на свое устройство (HTTPS)
2. `npm i` - установить зависимости
3. `npm run start` - запустить приложение

  <b>NB!</b> Для корректной работы в локальном репозитории следует также клонировать <a href="https://github.com/elrouss/movies-explorer-api">backend</a> и запустить в первую очередь его командой `npm run dev` (после установки зависимостей)

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="establishing"><h2>4. Процесс создания</h2></a>
Работа выполнена в <b>2 этапа</b>:
<br>
1. Верстка
2. Написание логики

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="tasks-and-problems"><h3>4.1 Основные задачи, проблемы и их решение</h3></a>
4.1.1 Синхронизация данных между найденными и добавленными карточками без лишних запросов к серверу, сохранение состояния между обновлениями страницы

  <b>Решение:</b> созданы 4 стейта - `allMovies`, `filteredMovies`, `savedMovies`, `filteredSavedMovies`. При первом поиске происходит сохранение всех найденных фильмов в `localStorage` с дальнейшим выводом пользователю отфильтрованного массива. Соответственно при любых дальнейших запросах происходит поиск по стейту `allMovies` без обращения к Api (поведение сохраняется после перезагрузки страницы). Синхронизация данных между 4 массивами происходит при помощи циклов.
  
При сохранении фильма в избранные нужный находится в массиве и к нему добавляются поля `selected` и `dbId` - идентификатор, создаваемый и отправляемый сервером (для возможности последующего удаления карточки). Поскольку данные, получаемые от стороннего Api отличаются, они модифицируются перед отправкой на сервер, написанный для этого проекта (где сохраняются данные пользователей и избранные карточки)

4.1.2 Валидация личных данных при регистрации, авторизации и обновлении

  <b>Решение:</b> согласно условию задания, следовало самостоятельно написать валидацию без привлечения сторонних библиотек. Для этого был использован кастомный хук (применен <a href="https://github.com/elrouss/react-mesto-auth">ранее</a> в учебном проекте) и попробован `pattern` атрибут полей форм в HTML. Последний показал свою ненадежность и возможность легкого обхода валидации на стороне клиента при изменении данных в DOM в инструменте разработчика

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

4.1.3 Отрисовка стартовой страницы и неавторизованного состояния `header` в процессе проверки токена и переадресации пользователя на защищенные роуты

  <b>Решение:</b> эта проблема была решена в учебном проекте <a href="https://github.com/elrouss/react-mesto-auth">ранее</a>, но показала свою неэффективность в данной работе (продолжалась отрисовка неавторизованного состояния `header` и мелькание страниц с формой регистрации и авторизации при переходе на них до появления страницы 404). Согласно изначальной логике, устанавливался `isAppLoading` со значением `false`, который в процессе проверки токена становился `true` и впоследствии снова `false` (соответственно, отрисовка роутов происходила только после установления `false` - в чем была ошибка). Поэтому было внесено изменение, согласно которому страница отрисовывается только в случае булевого `true` и, соответственно, сохранения `isAppLoading` с этим значением без возвращения к `false`

4.1.4 SCSS

<b>Решение:</b> при выполнении дипломного проекта был опробован `SCSS` (не входит в учебную программу) и в организации файловой структуры проведен эксперимент с паттерном <a href="https://sass-guidelin.es/ru/#section-39">7-in-1</a>. Последний доказал свою неэффективность в процессе разрастания проекта и подтвердил удобство компонентного подхода с хранением файлов `js` и `scss` в 1 папке

4.1.5 Типизация данных

<b>Решение:</b> опробованы `Proptypes` для Реакта (аналог типизации в TypeScript), которые показали свою эффективность при разрастании проекта

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="functionality"><h2>5. Функционал</h2></a>
- Регистрация и авторизация пользователей с редактированием личных данных
- Поиск фильмов с фильтрацией и рандомной генерацией вывода карточек, добавлением в избранные и удалением
- Валидация личных данных

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="enhancement"><h2>6. Планы по улучшению</h2></a>
- Оптимизация лишних ререндеров
- Рефакторинг и "разгрузка" компонента `App`
- Кроссбраузерность

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<div align="center">
  <a href="https://elrouss.mesto.nomoredomains.work">
    <img width="550" alt="Страница с поиском фильмов" src="https://github.com/elrouss/movies-explorer-frontend/assets/108838349/75c9b5f3-3dcb-406a-a0c6-7da2815a10a1">
  </a>
</div>
