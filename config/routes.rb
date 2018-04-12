Rails.application.routes.draw do
  get 'students/index'
  root to: 'students#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :students, except: :show
      get 'students/sort'=> 'students#sort'
    end
  end
end
