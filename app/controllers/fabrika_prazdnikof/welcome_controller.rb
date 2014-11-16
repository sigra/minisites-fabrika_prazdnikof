module FabrikaPrazdnikof
  class WelcomeController < ApplicationController
    def index
      @pages = Page.all
      @meta = {
        keywords: Setting.where(key: 'keywords').first.value,
        description: Setting.where(key: 'description').first.value
      }
    end

    def feedbacks
      render json: { feedbacks: Feedback.all.order('created_at DESC') }
    end

    def settings
      render json: { settings: {}.tap{|hash| Setting.all.each{|s| hash[s.key] = s.value }} }
    end

    # POST '/'
    def mail
      template = render_to_string('fabrika_prazdnikof/welcome/mail', layout: false)
      message = Mail.new do
        to Rails.env.production? ? 'anna_92113@mail.ru' : 'yakovlev.andr@gmail.com'
        from AppSettings.fabrika_prazdnikof.email.login
        subject 'Новая заявка с сайта Фабрика Праздников'
        body template
      end

      message.delivery_method.settings = {
        address: 'smtp.gmail.com',
        port: 587,
        authentication: :plain,
        charset: :utf8,
        enable_starttls_auto: true,
        user_name: AppSettings.fabrika_prazdnikof.email.login,
        password: AppSettings.fabrika_prazdnikof.email.password
      }

      message.deliver!
    end
  end
end
