module FabrikaPrazdnikof
  class AdminController < ApplicationController
    layout 'fabrika_prazdnikof/admin'

    before_filter :authenticate

    protected

    def authenticate
      authenticate_or_request_with_http_basic do |username, password|
        username == AppSettings.fabrika_prazdnikof.admin.login && password == AppSettings.fabrika_prazdnikof.admin.password
      end
    end
  end
end
