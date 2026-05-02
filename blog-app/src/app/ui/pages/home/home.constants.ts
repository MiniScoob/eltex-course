import type { Education } from '../../components/education-block';
import type { Hobby } from '../../components/hobby-card';

type Project = {
  title: string;
  description: string;
  icon: string;
  alt: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Новый лэндинг для онлайн-тренажёра',
    description: 'Мой первый коммерческий проект, основная задача - поднять оценку'
      + ' производительности до 90+ в мобильной версии сайта.',
    icon: 'icons/gauge_high.svg',
    alt: 'Иконка спидометра',
  },
  {
    title: 'Крипто-стартап',
    description: 'Отвечал за интеграцию взаимодействия с сервером и блокчейном,'
      + ' подписывание и проведение транзакций.\n'
      + 'Главное достижение — отслеживание всех шагов записи в блок с'
      + ' модальными окнами на каждый из них.',
    icon: 'icons/bitcoin.svg',
    alt: 'Иконка монеты Биткоин',
  },
  {
    title: 'Обменник на uniswap-протоколе',
    description: 'Интеграция взаимодействия с сервером и блокчейном.\n'
      + 'Главное достижение — вычисления с BigInt с погрешность, в разы меньше минимально допустимой.',
    icon: 'icons/arrow_right_arrow_left.svg',
    alt: 'Иконка обмена',
  },
  {
    title: 'Сайт-портфолио дизайнера интерьеров',
    description: 'Первый проект, в котором использовал Strapi: поднял, настроил, позже мигрировал на новую версию.',
    icon: 'icons/paint_roller.svg',
    alt: 'Иконка малярного валика',
  },
  {
    title: 'Telegram-бот для университета',
    description: 'Чат-бот для получения основной информации о факультете и студенческой жизни университета.\n'
      + 'Главные достижения: рассчёт рейтинга абитуриента для всех вариантов поступления'
      + ' (соновной конкурс, внебюджетный, по квотам) и наличия/отсутствия оригиналов документов,'
      + ' отказоустойчивость и защита от спам-атак.\n'
      + 'Рассчёт рейтинга производился на основе актуальных данных'
      + ' (бот парсил таблицу, которую заполняла приемная комиссия).',
    icon: 'icons/robot.svg',
    alt: 'Иконка робота',
  },
];

export const ACHIEVEMENTS = [
  'Сделал библиотеку для авторизации и работы с кошельком MetaMask под свои проекты.',
  'Почти сделал коммит в OpenSource-проект (мейнтейнер решил сделать правку день в день со мной😭😭😭).',
  'Сделал свой помоДора таймер (помодоро с Дорой).',
];

export const EDUCATIONS: Education[] = [
  {
    institution: 'Новосибирский государственный технический университет, 2023-2025',
    direction: 'Информатика и вычислительная техника (магистр техники и технологии)',
  },
  {
    institution: 'Сибирский государственный университет путей сообщения, 2019-2023',
    direction: 'Информационные системы и технологии (инженер)',
  },
];

type Skill = {
  field: string;
  values: string[];
};

export const SKILLS: Skill[] = [
  {
    field: 'Программирование',
    values: ['HTML5', 'CSS3/SASS', 'JavaScript', 'TypeScript', 'React/Next', 'NodeJS'],
  },
  {
    field: 'Инструменты',
    values: ['Git', 'Docker', 'Figma', 'WebStorm', 'VS Code'],
  },
  {
    field: 'Методологии',
    values: ['Scrum', 'Test-Driven Development'],
  },
];

export const HOBBIES: Hobby[] = [
  {
    title: 'Ретро',
    description: 'Старые консоли, пузатые телевизоры, фильмы на болванках',
    image: {
      src: 'images/retro.avif',
      alt: 'Изображение в эстетике киберпанка 80-ых',
    },
  },
  {
    title: 'Прогулки',
    description: 'Пройти с десяток киллометров, заглянуть в каждый уголок города',
    image: {
      src: 'images/park.avif',
      alt: 'Изображение парка летом',
    },
  },
  {
    title: 'Absolute Cinema',
    description: 'Просмотр классических ужастиков',
    image: {
      src: 'images/cinema.avif',
      alt: 'Absolute cinema',
    },
  },
  {
    title: 'Absolute Cinema',
    description: 'Творчество Линча и мемы по нему',
    image: {
      src: 'images/lynch.avif',
      alt: 'Режиссер Дэвид Линч сидит в чёрном вигваме',
    },
  },
];
