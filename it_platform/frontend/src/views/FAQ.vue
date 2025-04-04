<template>
  <div class="faq-page fade-in">
    <div class="card p-8 mb-8">
      <h1 class="text-3xl font-bold mb-6 text-primary-700 fade-in-down">Часто задаваемые вопросы (FAQ)</h1>
      
      <p class="text-lg text-text-medium mb-8">
        Здесь вы найдете ответы на наиболее часто задаваемые вопросы об IT-Платформе, её функциях и возможностях.
      </p>
      
      <div class="space-y-4 fade-in-up">
        <!-- Секция 1: Общие вопросы -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-text-dark mb-4">Общие вопросы</h2>
          
          <div class="space-y-4 animate-list">
            <div class="faq-item border border-gray-200 rounded-lg overflow-hidden" v-for="(item, index) in generalQuestions" :key="'general-'+index">
              <button 
                class="w-full p-4 flex justify-between items-center bg-light hover:bg-gray-100 transition text-left"
                @click="toggleQuestion('general', index)"
              >
                <span class="font-medium text-text-dark">{{ item.question }}</span>
                <svg 
                  class="w-5 h-5 text-text-medium transition-transform duration-200"
                  :class="{'transform rotate-180': item.isOpen}"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                v-show="item.isOpen"
                class="p-4 bg-white border-t border-gray-200" 
                ref="generalAnswer"
              >
                <p class="text-text-medium" v-html="item.answer"></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 2: Аккаунт и регистрация -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-text-dark mb-4">Аккаунт и регистрация</h2>
          
          <div class="space-y-4 animate-list">
            <div class="faq-item border border-gray-200 rounded-lg overflow-hidden" v-for="(item, index) in accountQuestions" :key="'account-'+index">
              <button 
                class="w-full p-4 flex justify-between items-center bg-light hover:bg-gray-100 transition text-left"
                @click="toggleQuestion('account', index)"
              >
                <span class="font-medium text-text-dark">{{ item.question }}</span>
                <svg 
                  class="w-5 h-5 text-text-medium transition-transform duration-200"
                  :class="{'transform rotate-180': item.isOpen}"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                v-show="item.isOpen"
                class="p-4 bg-white border-t border-gray-200" 
                ref="accountAnswer"
              >
                <p class="text-text-medium" v-html="item.answer"></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 3: События и календарь -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-text-dark mb-4">События и мероприятия</h2>
          
          <div class="space-y-4 animate-list">
            <div class="faq-item border border-gray-200 rounded-lg overflow-hidden" v-for="(item, index) in eventsQuestions" :key="'events-'+index">
              <button 
                class="w-full p-4 flex justify-between items-center bg-light hover:bg-gray-100 transition text-left"
                @click="toggleQuestion('events', index)"
              >
                <span class="font-medium text-text-dark">{{ item.question }}</span>
                <svg 
                  class="w-5 h-5 text-text-medium transition-transform duration-200"
                  :class="{'transform rotate-180': item.isOpen}"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                v-show="item.isOpen"
                class="p-4 bg-white border-t border-gray-200" 
                ref="eventsAnswer"
              >
                <p class="text-text-medium" v-html="item.answer"></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Секция 4: Прочие вопросы -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-text-dark mb-4">Прочие вопросы</h2>
          
          <div class="space-y-4 animate-list">
            <div class="faq-item border border-gray-200 rounded-lg overflow-hidden" v-for="(item, index) in otherQuestions" :key="'other-'+index">
              <button 
                class="w-full p-4 flex justify-between items-center bg-light hover:bg-gray-100 transition text-left"
                @click="toggleQuestion('other', index)"
              >
                <span class="font-medium text-text-dark">{{ item.question }}</span>
                <svg 
                  class="w-5 h-5 text-text-medium transition-transform duration-200"
                  :class="{'transform rotate-180': item.isOpen}"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                v-show="item.isOpen"
                class="p-4 bg-white border-t border-gray-200" 
                ref="otherAnswer"
              >
                <p class="text-text-medium" v-html="item.answer"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-10 p-6 bg-primary-50 rounded-lg text-text-medium border border-primary-100">
        <h3 class="text-lg font-semibold mb-2">Не нашли ответ на свой вопрос?</h3>
        <p class="mb-4">Свяжитесь с нами через форму обратной связи, и мы постараемся вам помочь.</p>
        <router-link to="/support" class="btn px-4 py-2 bg-primary-600 text-white rounded-md inline-block hover:bg-primary-700 transition hover-scale">
          Связаться с поддержкой
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  data() {
    return {
      generalQuestions: [
        {
          question: 'Что такое IT-Платформа?',
          answer: 'IT-Платформа — это онлайн-сервис, предназначенный для объединения IT-сообщества региона через календарь событий, новости и систему мотивации. Платформа помогает участникам IT-сообщества быть в курсе всех событий, получать актуальную информацию и развиваться в профессиональном плане.',
          isOpen: false
        },
        {
          question: 'Какие возможности предоставляет платформа?',
          answer: 'IT-Платформа предоставляет следующие возможности:<br><br>• Календарь IT-мероприятий с фильтрацией по типу, формату и городу<br>• Новостной раздел с актуальной информацией из мира IT<br>• Система достижений и мотивации для развития навыков<br>• Личный профиль с отслеживанием прогресса<br>• Возможность регистрации на мероприятия<br>• Уведомления о новых событиях и новостях',
          isOpen: false
        },
        {
          question: 'Кому подходит IT-Платформа?',
          answer: 'IT-Платформа подходит для всех, кто интересуется информационными технологиями: студентов IT-специальностей, профессиональных разработчиков, дизайнеров, менеджеров, маркетологов и других специалистов, связанных с IT-сферой. Также платформа будет полезна организаторам IT-мероприятий и HR-специалистам, ищущим таланты.',
          isOpen: false
        },
        {
          question: 'Сколько стоит использование платформы?',
          answer: 'Базовое использование IT-Платформы полностью бесплатно. Вы можете просматривать календарь событий, читать новости и участвовать в мероприятиях без каких-либо платежей. В будущем может быть добавлен премиум-доступ с расширенными возможностями.',
          isOpen: false
        }
      ],
      accountQuestions: [
        {
          question: 'Как зарегистрироваться на платформе?',
          answer: 'Для регистрации на IT-Платформе нажмите кнопку "Регистрация" в верхнем меню сайта. Заполните форму регистрации, указав свое имя, адрес электронной почты и пароль. После этого подтвердите свой адрес электронной почты, перейдя по ссылке, которая будет отправлена на указанный вами email.',
          isOpen: false
        },
        {
          question: 'Как изменить данные моего профиля?',
          answer: 'Чтобы изменить данные профиля, войдите в свою учетную запись и перейдите в раздел "Профиль". Нажмите на кнопку "Редактировать профиль" и внесите необходимые изменения. После завершения редактирования не забудьте нажать кнопку "Сохранить".',
          isOpen: false
        },
        {
          question: 'Что делать, если я забыл пароль?',
          answer: 'Если вы забыли пароль, нажмите на ссылку "Забыли пароль?" на странице входа. Введите адрес электронной почты, связанный с вашей учетной записью, и вам будет отправлена ссылка для сброса пароля. Перейдите по этой ссылке и установите новый пароль.',
          isOpen: false
        },
        {
          question: 'Могу ли я удалить свою учетную запись?',
          answer: 'Да, вы можете удалить свою учетную запись. Для этого перейдите в раздел "Профиль", выберите "Настройки аккаунта" и нажмите на кнопку "Удалить аккаунт". Обратите внимание, что это действие необратимо и приведет к удалению всех ваших данных с платформы.',
          isOpen: false
        }
      ],
      eventsQuestions: [
        {
          question: 'Как найти интересующее меня мероприятие?',
          answer: 'Для поиска мероприятий перейдите в раздел "События". Вы можете использовать фильтры для поиска по дате, типу мероприятия, формату (онлайн/офлайн) и городу. Также вы можете использовать теги для поиска мероприятий по конкретным тематикам или технологиям.',
          isOpen: false
        },
        {
          question: 'Как зарегистрироваться на мероприятие?',
          answer: 'Чтобы зарегистрироваться на мероприятие, найдите его в календаре и кликните для просмотра подробной информации. На странице мероприятия нажмите кнопку "Регистрация", после чего вы будете перенаправлены на страницу регистрации организатора или получите дополнительные инструкции.',
          isOpen: false
        },
        {
          question: 'Могу ли я добавить свое мероприятие в календарь?',
          answer: 'Да, если вы являетесь организатором IT-мероприятия, вы можете добавить его в наш календарь. Для этого необходимо зарегистрироваться как организатор и заполнить форму добавления нового мероприятия. После модерации ваше мероприятие появится в общем календаре.',
          isOpen: false
        },
        {
          question: 'Как отменить регистрацию на мероприятие?',
          answer: 'Если вы хотите отменить регистрацию на мероприятие, перейдите в свой профиль, раздел "Мои мероприятия", найдите нужное мероприятие и нажмите на кнопку "Отменить регистрацию". Обратите внимание, что для некоторых мероприятий может быть установлен срок, после которого отмена регистрации невозможна.',
          isOpen: false
        }
      ],
      otherQuestions: [
        {
          question: 'Как работает система достижений?',
          answer: 'Система достижений IT-Платформы основана на получении опыта (XP) за различные действия: посещение мероприятий, выполнение заданий, участие в конкурсах и т.д. По мере накопления XP вы повышаете свой уровень и открываете новые достижения, которые отображаются в вашем профиле и могут давать дополнительные преимущества.',
          isOpen: false
        },
        {
          question: 'Как связаться с администрацией платформы?',
          answer: 'Для связи с администрацией платформы вы можете использовать раздел "Поддержка", где есть форма обратной связи. Также вы можете написать нам на электронную почту <a href="mailto:info@it-platform.ru" class="text-primary-600 hover:underline">info@it-platform.ru</a> или позвонить по телефону +7 (4162) XX-XX-XX в рабочее время.',
          isOpen: false
        },
        {
          question: 'Как я могу предложить улучшения для платформы?',
          answer: 'Мы всегда рады предложениям по улучшению платформы! Вы можете отправить свои идеи через форму обратной связи в разделе "Поддержка" или написать нам на почту <a href="mailto:feedback@it-platform.ru" class="text-primary-600 hover:underline">feedback@it-platform.ru</a>. Мы внимательно рассматриваем все предложения и учитываем их в развитии платформы.',
          isOpen: false
        },
        {
          question: 'Есть ли мобильное приложение IT-Платформы?',
          answer: 'В настоящее время мобильное приложение IT-Платформы находится в разработке. Пока вы можете использовать мобильную версию нашего сайта, которая оптимизирована для просмотра на мобильных устройствах. О выпуске мобильного приложения мы обязательно сообщим в наших новостях.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleQuestion(section, index) {
      // Get the reference to the specific question array
      const questionArray = this[section + 'Questions'];
      
      // Toggle the isOpen state
      questionArray[index].isOpen = !questionArray[index].isOpen;
    }
  },
  mounted() {
    // Scroll to top when component is mounted
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.animate-list > * {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.animate-list > *:nth-child(1) { animation-delay: 0.1s; }
.animate-list > *:nth-child(2) { animation-delay: 0.2s; }
.animate-list > *:nth-child(3) { animation-delay: 0.3s; }
.animate-list > *:nth-child(4) { animation-delay: 0.4s; }
.animate-list > *:nth-child(5) { animation-delay: 0.5s; }

.faq-item:hover {
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
</style> 