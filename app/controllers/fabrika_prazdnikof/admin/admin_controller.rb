module FabrikaPrazdnikof
  class Admin::AdminController < AdminController
    def index
      @pages = Page.all
      @settings = {}.tap{|hash| Setting.all.each{|s| hash[s.key] = s.value }}
      @current_gallery = params[:gallery] || 'korporativi'
      @current_page    = params[:page] || 'korporativi'
    end
  end
end
