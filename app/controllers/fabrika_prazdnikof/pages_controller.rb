module FabrikaPrazdnikof
  class PagesController < ApplicationController
    def show
      photos = []
      Photo.where(key: params[:id]).each do |p|
        photos << {
          image: '/fabrika_prazdnikof/dragonfly/' + p.image_uid,
          thumb: '/fabrika_prazdnikof/dragonfly/' + p.thumb_uid
        }
      end

      render json: {
             page: Page.find_by(key: params[:id]),
             photos: photos
           }
    end
  end
end
