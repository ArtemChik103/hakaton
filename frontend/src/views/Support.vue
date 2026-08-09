<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4 text-left">
    
    <!-- Header -->
    <div class="border-b border-slate-800 pb-6">
      <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
        <span>💬 Поддержка</span>
        <span>•</span>
        <span>Обратная связь</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
        Служба Поддержки IT-Платформы
      </h1>
      <p class="text-slate-400 text-sm mt-1">Возникли вопросы по хакатонам или работе сайта? Напишите нам, и мы оперативно ответим.</p>
    </div>

    <!-- Contact Form Card -->
    <div class="card-glass border-cyan-500/30 p-8 space-y-6">
      <form @submit.prevent="sendMessage" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Ваше имя</label>
            <input v-model="form.name" type="text" required placeholder="Александр" class="form-input" />
          </div>
          <div>
            <label class="form-label">Email или Telegram</label>
            <input v-model="form.contact" type="text" required placeholder="@username или email@domain.ru" class="form-input" />
          </div>
        </div>

        <div>
          <label class="form-label">Тема обращения</label>
          <select v-model="form.subject" class="form-input">
            <option value="hackathon">Регистрация на хакатон</option>
            <option value="organizer">Добавление собственного мероприятия</option>
            <option value="bug">Технический баг / Ошибка</option>
            <option value="partnership">Сотрудничество и партнерство</option>
          </select>
        </div>

        <div>
          <label class="form-label">Сообщение</label>
          <textarea v-model="form.message" rows="4" required placeholder="Опишите ваш вопрос или предложение..." class="form-input"></textarea>
        </div>

        <button type="submit" class="w-full btn btn-primary py-3 text-sm">
          Отправить обращение →
        </button>

        <div v-if="sent" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-mono text-xs text-center">
          ✅ Ваше сообщение успешно отправлено! Мы свяжемся с вами в течение короткого времени.
        </div>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SupportPage',
  data() {
    return {
      form: {
        name: '',
        contact: '',
        subject: 'hackathon',
        message: ''
      },
      sent: false
    }
  },
  methods: {
    sendMessage() {
      this.sent = true;
      setTimeout(() => {
        this.form = { name: '', contact: '', subject: 'hackathon', message: '' };
      }, 2000);
    }
  }
}
</script>