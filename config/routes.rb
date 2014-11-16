FabrikaPrazdnikof::Engine.routes.draw do
  root to: "welcome#index"

  post '/', to: "welcome#mail"

  get :settings, to: 'welcome#settings'
  get :feedbacks, to: 'welcome#feedbacks'

  resources :pages, only: :show

  namespace :admin do
    root to: 'admin#index'

    post :settings

    resources :pages, only: :update
    resources :photos, only: [:create, :destroy]
    resources :feedbacks, only: [:create, :destroy]
  end
end
